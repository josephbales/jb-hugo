---
title: "Error converting data type DBTYPE_DBTIMESTAMP to datetime2"
author: Joseph Bales
date: 2015-09-15
---
Okay, so here is a post that has been months in the making.

Lately I've been working on an <a href="https://en.wikipedia.org/wiki/Extract,_transform,_load" target="_blank">ETL</a> project, mostly the E and T parts. The project involves exporting data from a database via an <a href="https://en.wikipedia.org/wiki/Open_Database_Connectivity" target="_blank">ODBC</a> driver (<a href="http://supportline.microfocus.com/Documentation/AcucorpProducts/docs/v6_online_doc/acuodbc/acuodbct.htm" target="_blank">AcuODBC</a> to be exact). I don't have any control over the database being accessed other than being able to extract data and neither the client nor I have much knowledge of how the database actually works. For my part I just know that I can access it via the AcuODBC driver.

I am using .NET and C# to do the data extraction and translating, but I've run into an issue on several tables that has perplexed me for some time. It is the error message that I've used as the title of this post:

```Error converting data type DBTYPE_DBTIMESTAMP to datetime2.```

No matter how I was trying to get at the data, I kept getting this error. I tried <a href="https://msdn.microsoft.com/en-us/library/ms187928.aspx" target="_blank">CAST and CONVERT</a> SQL commands. I tried <a href="https://msdn.microsoft.com/en-us/library/ms162802.aspx" target="_blank">BCP</a>. I tried using <a href="https://msdn.microsoft.com/en-us/library/ms188029.aspx" target="_blank">SELECT INTO</a>. I tried <a href="https://msdn.microsoft.com/en-us/library/system.data.sqlclient.sqlbulkcopy(v=vs.110).aspx" target="_blank">SqlBulkCopy</a>. I finally got all the way down to using an <a href="https://msdn.microsoft.com/en-us/library/system.data.odbc.odbcdatareader(v=vs.110).aspx" target="_blank">OdbcDataReader</a> object to try to move the data, but I kept getting the error when I used `reader[index].ToString()` to access the data.

But then I noticed there was a method called <a href="https://msdn.microsoft.com/en-us/library/system.data.odbc.odbcdatareader.getstring(v=vs.110).aspx" target="_blank">GetString</a> in the OdbcDataReader object. I tried it and by golly it worked! (If you have been wondering what the cause of this error has been all along, it is an invalid date that was entered into the database with the year 0000). Yes, it worked, but it worked sloooooooow. Veeeeery slow. It was processing about 2 records per second, which isn't too bad until you scale that up to over 1.1 million records. The time to extract just that one table would be over 6 days! That would not do.

I sat on it for a few days and thought about all the potential solutions. I could bulk copy all the rows except the ones in question, but then I'd have to go through each table and find the culprit(s) and write special select statements to exclude those rows, then special select statements to grab those rows minus the offending fields. Then I'd have to update my table with the omitted records. Not something I really wanted to do.

Then today I noticed that when I used the `reader[index].ToString()` method to get the data, it came out at a much faster, more acceptable speed. Okay, so what if I wrap that in a try block and then in the catch block I use the slower GetString method? If that worked then only the offending data would get extracted using the slow GetString method and everything else would use the other method. And what do you know, it DID work! Here's the code for posterity (yeah, I'm stripping out all the new lines and spaces).

```csharp
while (reader.Read())
{
    string line = "";

    for (int i = 0; i < fCount; i++)
    {
        try
        {
            line = line + reader[i].ToString().Trim().Replace("\n", "").Replace("\r", " ") + "\t";
        }
        catch (Exception)
        {
            line = line + reader.GetString(i).Trim().Replace("\n", "").Replace("\r", " ") + "\t";
        }
    }
}
```

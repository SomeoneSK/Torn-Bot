let errors = {}
/*
0 => Unknown error : Unhandled error, should not occur.
1 => Key is empty : Private key is empty in current request.
2 => Incorrect Key : Private key is wrong/incorrect format.
3 => Wrong type : Requesting an incorrect basic type.
4 => Wrong fields : Requesting incorrect selection fields.
5 => Too many requests : Current private key is banned for a small period of time because of too many requests (max 100 per minute).
6 => Incorrect ID : Wrong ID value.
7 => Incorrect ID-entity relation : A requested selection is private (For example, personal data of another user / faction).
8 => IP block : Current IP is banned for a small period of time because of abuse.
9 => API disabled : Api system is currently disabled.
10 => Key owner is in federal jail : Current key can't be used because owner is in federal jail.
11 => Key change error : You can only change your API key once every 60 seconds.
12 => Key read error : Error reading key from Database.
13 => The key is temporarily disabled due to owner inactivity : The key owner hasn't been online for more than 7 days.
14 => Daily read limit reached.
*/

exports.errors = errors;
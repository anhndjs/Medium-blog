## Table of Contents
* [Quan trọng](#)
  * [Create Relationship in mongoDB](#create-relationship-in-mongodb)
  * [Atomic Operators trong Mongo Shell](#atomic-operator)
  * [CRUD with Mongo Shell](#crud-with-mongo-shell)
  * [Collection method with mongo shell](#collection-method-with-mongo-shell)
  * [Query nested with mongo Shell](#query-nested)
  * [Populate](#populate)
  * [Populate with aggregate](#populate-with-aggregate)
  * [index](#index)
  * [Aggregation](#aggregation)
  * [other](#other)
---
1. [ODM](#odm) </br>
   1.1 [ODM là gì](#odm) </br>
   1.2 [Ưu điểm của ODM](#ưu-điểm-của-odm) </br>
   1.3 [Nhược điểm của ODM](#nhược-điểm-của-odm) </br>
2. [ORM](#orm-là-gì) </br>
   2.1 [ORM là gì](#orm-là-gì) </br> 
   2.2 [Ưu điểm của ORM](#ưu-điểm-của-orm) </br>
   2.3 [Nhược điểm của ORM](#nhược-điểm-của-orm) </br>
3. [Database driver là gì](#database-driver-là-gì) </br>
   3.1 [Database driver là gì](#database-driver-là-gì) </br>
4. [So sánh ODM, ORM và Database driver](#orm-vs-database-driver) </br>
5. [Mongoose là gì](#mongoose-là-gì) </br>
   5.1 [Mongoose là gì](#mongoose-là-gì) </br>
6. [Schema](#tạo-schema) </br>
7. [Tạo Model](#tạo-model) </br>
8. [CRUD](#crud) </br>
   8.1 [Tạo document](#tạo-document) </br>
   8.2 [Đọc document](#đọc-document) </br>
   8.3 [Model find](#model-find) </br>
   8.4 [Model findByID](#model-findbyid) </br>
   8.5 [Model findByIdAndDelete](#model-findbyidanddelete) </br>
   8.6 [Model findByIdAndRemove](#model-findbyidandremove) </br>
   8.7 [Model findByIdAndUpdate](#model-findbyidandupdate) </br>
   8.8 [Model findOne](#model-findone) </br>
   8.9 [Model findOneAndDelete](#model-findoneanddelete) </br>
   8.10 [Model Deleting](#model-deleting) </br>
   8.11 [Model Updating](#model-updating) </br>

---

### index
Về cơ bản index trong MongoDB củng giống như index trong các cơ sở dữ liệu khác .
Index giúp tìm kiếm dữ liệu nhanh hơn , vì khi tạo index data sữ được sắp xếp theo ý muốn và sẽ sử dụng thuật toán binary search nên sẽ nhanh hơn.
**Nhược điểm thì sẽ bị chậm khi update data do phải sửa index lại nhưng đọc dữ liệu nhanh**
Nhiều index sẽ tốn nhiều RAM . 
compoud index là tạo index nhiều fields khác nhau

**[⬆ back to top](#table-of-contents)**
### Aggregation
Aggregation là một cách để lọc, sắp xếp, nhóm, định hình lại và phân tích dữ liệu mà không thay đổi bất kỳ dữ liệu nào trong collection </br>
**Aggregation pipeline**
Aggregation pipeline là một chuỗi các stage , mỗi stage sẽ chuyển đổi dữ liệu từ stage trước đó và trả về kết quả cho stage tiếp theo </br>
Stage : 
- `$match` : lọc dữ liệu
- `$group` : nhóm dữ liệu
- `$sort` : sắp xếp dữ liệu
- `$set` : Thay đổi hoặc tạo mới dữ liệu
- `$project` : định hình lại dữ liệu
- `$limit` : giới hạn số lượng dữ liệu
- `$skip` : bỏ qua số lượng dữ liệu
- `$unwind` : chuyển đổi một mảng thành nhiều document
- `$lookup` : liên kết dữ liệu từ 2 collection
- `$out` : xuất dữ liệu ra collection khác
- `$count` : đếm số lượng dữ liệu

```json
    db.collection.aggregate([
        { $match: { <query> } },
        { $group: { _id: <expression>, <field1>: { <accumulator1> }, ... } },
        { $project: { <field1>: 1, <field2>: { <expression> }, ... } },
        { $sort: { <field1>: <sort order>, <field2>: <sort order> ... } },
        { $skip: <number to skip> },
        { $limit: <number to return> },
        { $unwind: <field path> },
        { $out: <collection name> }
    ])
``` 

**[⬆ back to top](#table-of-contents)**

### Create Relationship in mongoDB
**Châm ngôn**</br>
> Data that is accessed together should be stored together

Có hai cách để tạo Relationships trong MongoDB :
- Embedded document model
- Reference model

![iamge](https://d36ai2hkxl16us.cloudfront.net/course-uploads/ae62dcd7-abdc-4e90-a570-83eccba49043/7ev1uxwmqacn-embeddingreferencing.png)
Embedded Document Model : Document được gắn vào bên trong một document khác</br>
-> đơn giản hơn, dễ dàng truy vấn, nhưng không thể tái sử dụng được</br>
-> document rõ ràng</br>
```json
{
  _id: 1,
  name: "Nguyen Van A",
  address: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001"
  }
}
```
Reference Model : Các document được phân tách với nhau và chúng tham chiếu với nhau qua trường tham chiếu ví dụ như id của trường cần tham chiếu </br>
-> linh hoạt các fields cần thêm </br>
-> Dung lượng ổ đĩa nhỏ hơn</br>
-> Ít cần RAM hơn</br>
```json
{
  _id: 1,
  name: "Nguyen Van A",
  address: ObjectId("5d9b1b9b4b6b9c0b8c0d8b1c")
}
```
### One-to-one
|customer|
|--|  
|name|
|customer_id|

**Đây là liên kết 1-1 vì chỉ có 1 name được liên kết với 1 customer_id và customer_id chỉ được sử dụng để xác định customer name**

-> Ưu tiên Embed hơn là Referance cho document đơn giản</br>
-> Sử dụng subdocument để tổ chức fields</br>
-> Sử dụng reference cho mục đích tối ưu</br>
### One-to-Many
|customer|
|--|
|name|
|customer_id|

|invoices|
|--|
|invoice_id|
|customer_id|

**Đây là liên kết 1-n vì 1 customer có nhiều invoices , và mỗi invoices chỉ được liên kết với 1 customer**

Embed :</br>
- Áp dụng khi ít document embed vào</br>
Reference : </br>
- Cho phép liên kết nhiều document
- Tham c hiếu là một Array
### Many-to-Many
|customer|
|--|
|name|
|customer_id|

|invoices|
|--|
|invoice_id|
|customer_id|
|products[ ]|

|products|
|--|
|products_id|
|desciption|

**Đây là liên kết n-n vì 1 invoice thì có nhiều products và mỗi products thì lại có nhiều invoice**

---

### Populate with aggregate
`$lookup` : 
- chỉ dùng với `aggregate`
- có thể lấy các tài liệu được tham chiếu theo bất kỳ trường nào
- thường hoạt động hiệu quả hơn vì đó là hoạt động phía máy chủ
- chỉ có thể được sử dụng để lấy các tài liệu được tham chiếu từ unsharded collections
- yêu cầu MongoDB 3.2+
  
Populate : 
  - có thể được sử dụng với method `find` và `aggregate`
  - chỉ có thể lấy các tài liệu được tham chiếu bởi `_id`
  - không yêu cầu phiên bản MongoDB
  - có thể được sử dụng để lấy các tài liệu được tham chiếu từ cả sharded và unsharded collections


> **unsharded collections** có nghĩa là collections không được chia sẻ trên cluster
> 
> **sharded collections** có nghĩa là dữ liệu được chia sẻ trên các cluster khác nhau, không phải nhiều database
>
> [Đọc thêm](https://www.mongodb.com/docs/manual/sharding/?_ga=2.14732534.1359948484.1667786675-1606935944.1665978367#sharded-and-non-sharded-collections)
> ![Sharding](https://www.mongodb.com/docs/manual/images/sharded-cluster-primary-shard.bakedsvg.svg)

> **Cluster** là một hệ thống bao gồm nhiều máy chủ được kết nối với nhau . Nếu một máy chủ ngừng hoạt động do bị sự cố hoặc để nâng cấp, bảo trì, thì toàn bộ công việc mà máy chủ này đảm nhận sẽ được tự động chuyển sang cho một máy chủ khác (trong cùng một cluster) mà không làm cho hoạt động của hệ thống bị ngắt hay gián đoạn.

Document cung cấp một cách linh hoạt và thân thiện với nhà phát triển để làm việc với dữ liệu của bạn

---
## ODM 
ánh xạ mô hình đối tượng và cơ sở dữ liệu NoSQL

ODM là một công nghệ cho phép lập trình viên lưu trữ dữ liệu dưới dạng tài liệu trong MongoDB và truy xuất dữ liệu dưới dạng đối tượng trong ngôn ngữ lập trình. Các công nghệ ODM phổ biến nhất là Mongoose và Mongorito.

**[⬆ back to top](#table-of-contents)**
### Ưu điểm của ODM
* Có thể sử dụng các đối tượng trong ngôn ngữ lập trình để truy xuất dữ liệu trong MongoDB.
* Lưu trữ dưới dạng JSON trong MongoDB.
* Tốc độ truy xuất nhanh

**[⬆ back to top](#table-of-contents)**
### Nhược điểm của ODM
- Không tối ưu cho các truy vấn có nhiều bảng
- Cần phải biết các lệnh của mongo shell để truy vấn các query phức tạp

**[⬆ back to top](#table-of-contents)**

---
### ORM là gì 
ORM là 1 kỹ thuật lập trình giúp ánh xạ các record dữ liệu trong hệ quản trị cơ sở dữ liệu sang dạng đối tượng đang định nghĩa trong các class

**[⬆ back to top](#table-of-contents)**
### Ưu điểm của ORM:
- Tiết kiệm thời gian
- Giảm thiểu được lỗi do viết sai câu lệnh SQL.
- Giảm thiểu được việc viết lại câu lệnh SQL.
- Sử dụng linh hoạt vì nó phụ thuộc vào ngôn ngữ mình đang sử dụng
- Dễ dàng debug

**[⬆ back to top](#table-of-contents)**
### Nhược điểm của ORM:
- Tốc độ truy xuất chậm
- Cần biết SQL đối với câu lệnh phức tạp

**[⬆ back to top](#table-of-contents)**

---
### Database driver là gì 
Database driver là một thư viện được cung cấp bởi các nhà cung cấp database để cho phép các ứng dụng truy cập vào database. Nó cung cấp các API để thực hiện các thao tác trên database như: kết nối, thêm, sửa, xóa, truy vấn dữ liệu

**[⬆ back to top](#table-of-contents)**
### SQL VS MONGO
| | SQL | MONGO |
| ---| --- | --- |
|  |Table | Collection |
|  |Row | Document |
|  |Column | Field |
|  | join | Embedded documents or Link |
| Mô hình dữ liệu | Có cấu trúc | Không có cấu trúc |
| Lưu dữ liệu | Dữ liệu được lưu dưới dạng bảng | Dữ liệu được lưu dưới dạng document |
| Khả năng mở rộng | Không thể mở rộng | Có thể mở rộng |
| Schema | Có | Không |
| Truy vấn | Có thể truy vấn dữ liệu bằng câu lệnh SQL |Truy vấn dữ liệu bằng Mongo Shell |

**[⬆ back to top](#table-of-contents)**

### ORM vs Database driver
ORM và Database driver đều là một thư viện để truy cập vào database. Tuy nhiên, ORM sẽ chuyển đổi các câu lệnh của ngôn ngữ lập trình thành câu lệnh SQL và thực thi trên database. Còn Database driver sẽ thực thi các câu lệnh SQL trực tiếp trên database. </br>
[Tham khảo](https://www.quora.com/What-is-the-difference-between-an-Object-Relational-Mapping-ORM-and-a-Driver-for-Databases)

**[⬆ back to top](#table-of-contents)**

---
### Mongoose là gì
Mongoose là một Object Data Modeling (ODM) cho Node.js và MongoDB. Nó cho phép chúng ta tương tác với database thông qua các đối tượng JavaScript. Mongoose sử dụng các schema để định nghĩa cấu trúc của các document trong database. Mongoose cũng hỗ trợ các tính năng như validation, middleware, hooks, virtuals, indexes, inheritance, và các tính năng khác.

**[⬆ back to top](#table-of-contents)**
### Tạo Schema
Schema là khuôn mẫu giúp tạo những document có các field như vậy
Mongoose schema xác định cấu trúc của tài liệu, các giá trị mặc định, xác nhận
Chúng ta có thể tạo Schema bằng cách sử dụng `mongoose.Schema()`. Ví dụ:
```js
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    age: Number
});
```
Trong đó:
- `mongoose.Schema()` là một phương thức để tạo Schema
- `name: String, age: Number` là các thuộc tính của Schema

```js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```
Schema có thể chứa các kiểu dữ liệu như String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map, Schema.

**[⬆ back to top](#table-of-contents)**
### Tạo Model
Model là tạo document dựa trên Schema đã tạo . Model là một class có thể được sử dụng để tạo các document. Model có thể được tạo bằng cách sử dụng `mongoose.model().
Mongoose model cung cấp một giao diện cho cơ sở dữ liệu để tạo, truy vấn, cập nhật, xoá các bản ghi
```js
const User = mongoose.model('User', UserSchema);
```
Trong đó:
- `mongoose.model()` là một phương thức để tạo Model
- `User` là tên của Model
- `UserSchema` là Schema của Model


**[⬆ back to top](#table-of-contents)**
## CRUD

### Tạo document
Để tạo document, chúng ta sử dụng phương thức `create()` của Model. 
Ví dụ:
```js
const user = new User({ name: 'John', age: 20 });
user.save();
```
Trong đó:
- `new User({ name: 'John', age: 20 })` là một document
- `user.save()` là phương thức để lưu document vào database

Phương thức `create()` của Model
```js
const Tank = mongoose.model('Tank', yourSchema);

const small = new Tank({ size: 'small' });
small.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

// or

Tank.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
});

// or, for inserting large batches of documents
Tank.insertMany([{ size: 'small' }], function(err) {

})
```

**[⬆ back to top](#table-of-contents)**
### Đọc document

### Model find
***Model.find()***

Collection là một tập hợp các document. Chúng ta có thể sử dụng phương thức `find()` của Model để tìm kiếm document trong collection. Ví dụ:
```js
// find all documents
await MyModel.find({});

// find all documents named john and at least 18
await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

// executes, passing results to callback
MyModel.find({ name: 'john', age: { $gte: 18 }}, function (err, docs) {});

// executes, name LIKE john and only selecting the "name" and "friends" fields
await MyModel.find({ name: /john/i }, 'name friends').exec();

// passing options
await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();
```

**[⬆ back to top](#table-of-contents)**
### exec()
`callback`
```js
User.findOne({ name: 'daniel' }, function (err, user) {
  //
});
```
`exec()`
```js
User
  .findOne({ name: 'daniel' })
  .exec(function (err, user) {
      //
  });
```

**[⬆ back to top](#table-of-contents)**
### Model findByID
***Model.findById()***

```js
// Find the adventure with the given `id`, or `null` if not found
await Adventure.findById(id).exec();

// using callback
Adventure.findById(id, function (err, adventure) {});

// select only the adventures name and length
await Adventure.findById(id, 'name length').exec();
```
> `findOne(undefined)` `findOne({ _id: undefined })` will return the first document in the collection, which is not what you want. Use `findOne({})` instead.
>  Tuy nhiên , moongose chuyển đổi `findById(undefined)` into `findOne({ _id: null })`.

**[⬆ back to top](#table-of-contents)**
### Model findByIdAndDelete
***Model.findByIdAndDelete()***

```js
// Find the adventure with the given `id`, or `null` if not found
await Adventure.findByIdAndDelete(id).exec();
await Adventure.findByIdAndDelete({ _id: id }).exec();
```

**[⬆ back to top](#table-of-contents)**
### Model findByIdAndRemove
***Model.findByIdAndRemove()***

```js
A.findByIdAndRemove(id, options, callback) // executes
A.findByIdAndRemove(id, options)  // return Query
A.findByIdAndRemove(id, callback) // executes
A.findByIdAndRemove(id) // returns Query
A.findByIdAndRemove()           // returns Query
```

**[⬆ back to top](#table-of-contents)**
### Model findByIdAndUpdate
***Model.findByIdAndUpdate()***
```js
A.findByIdAndUpdate(id, update, options, callback) // executes
A.findByIdAndUpdate(id, update, options)  // returns Query
A.findByIdAndUpdate(id, update, callback) // executes
A.findByIdAndUpdate(id, update)           // returns Query
A.findByIdAndUpdate()                     // returns Query
```

**[⬆ back to top](#table-of-contents)**
### Model findOne
***Model.findOne()***

```js
// Find one adventure whose `country` is 'Croatia', otherwise `null`
await Adventure.findOne({ country: 'Croatia' }).exec();

// using callback
Adventure.findOne({ country: 'Croatia' }, function (err, adventure) {});

// select only the adventures name and length
await Adventure.findOne({ country: 'Croatia' }, 'name length').exec();
```

**[⬆ back to top](#table-of-contents)**
### Model findOneAndDelete
***Model.findOneAndDelete()***

```js
A.findOneAndDelete(conditions, options, callback) // executes
A.findOneAndDelete(conditions, options)  // return Query
A.findOneAndDelete(conditions, callback) // executes
A.findOneAndDelete(conditions) // returns Query
A.findOneAndDelete()           // returns Query
```
> Hàm này hơi khác với `Model.findOneAndRemove ()` ở chỗ `findOneAndRemove ()` trở thành lệnh MongoDB `findAndModify ()`, trái ngược với lệnh `findOneAndDelete ()`. Đối với hầu hết các trường hợp sử dụng mongoose, sự khác biệt này hoàn toàn mang tính mô phạm. Bạn nên sử dụng `findOneAndDelete ()` trừ khi bạn có lý do chính đáng để không sử dụng.

**[⬆ back to top](#table-of-contents)**

### Model Deleting
`deleteOne ()` và `deleteMany ()`  để xóa tất cả các tài liệu phù hợp với bộ lọc đã cho 
```js
Tank.deleteOne({ size: 'large' }, function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
});
```

**[⬆ back to top](#table-of-contents)**
### Model Updating
```js
Tank.updateOne({ size: 'large' }, { name: 'T-90' }, function(err, res) {
  // Updated at most one doc, `res.nModified` contains the number
  // of docs that MongoDB updated
});
```
`updateOne()` sẽ không return nếu muốn return thì dùng `findOneAndDUpate()`

**[⬆ back to top](#table-of-contents)**
### Populate
Populate là quá trình thay thế path được chỉ định trong document của một collection bằng document khác từ collection khác.
Ta cần phải khai báo một referencs đến một document của collections cần liên kết
```js
const postSchema = new mongoose.Schema({
    title: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
Story.
  findOne({ title: 'Casino Royale' }).
  populate('author').
  exec(function (err, story) {
    if (err) return handleError(err);
    console.log(story);
  });
```
kết quả trả về có dạng như sau:
```json
{
  "_id": "5e9b9b9b9b9b9b9b9b9b9b9b",
  "title": "Casino Royale",
  "author": {
    "_id": "2e9b9b9b9b9b9b9b9b9b9b9b",
    "name": "Ian Fleming",
    "__v": 0
  },
  "__v": 0
}
```

```js
Story.
  find(...).
  populate({
    path: 'fans',
    match: { age: { $gte: 21 }},
    select: 'name -_id',
    options: { limit: 5 }
  }).
  exec();
```
</br>

Giống với $lookup trong aggeration
```js
db.orders.insertMany( [
   { "_id" : 1, "item" : "almonds", "price" : 12, "quantity" : 2 },
   { "_id" : 2, "item" : "pecans", "price" : 20, "quantity" : 1 },
   { "_id" : 3  }
] )
db.inventory.insertMany( [
   { "_id" : 1, "sku" : "almonds", "description": "product 1", "instock" : 120 },
   { "_id" : 2, "sku" : "bread", "description": "product 2", "instock" : 80 },
   { "_id" : 3, "sku" : "cashews", "description": "product 3", "instock" : 60 },
   { "_id" : 4, "sku" : "pecans", "description": "product 4", "instock" : 70 },
   { "_id" : 5, "sku": null, "description": "Incomplete" },
   { "_id" : 6 }
] )
```

```js
db.orders.aggregate( [
   {
     $lookup:
       {
         from: "inventory",
         localField: "item",
         foreignField: "sku",
         as: "inventory_docs"
       }
  }
] )
```
output
```json
{
   "_id" : 1,
   "item" : "almonds",
   "price" : 12,
   "quantity" : 2,
   "inventory_docs" : [
      { "_id" : 1, "sku" : "almonds", "description" : "product 1", "instock" : 120 }
   ]
}

```

**[⬆ back to top](#table-of-contents)**


#### Other
### Mongo Data Types
- String
- Number
- Boolean
- Object , Array
- ObjectID
- Null
- BigInt 
- Symbol
- Date
ObjectID gồm có 12 byte và 24 kí tự . 4 byte timestampe + 5 byte random + 3 byte tự động tăng lên

import data from csv
```json
    mongoimport --db test --collection restaurants --type csv --headerline --file restaurants.csv
```

**[⬆ back to top](#table-of-contents)**

### Query nested
## Object
```bash
db.trips.find({ "address.zipcode": "10075" })
```
```json
{
  _id : ObjectId("5d9b1b9b4b6b9c0b8c0d8b1c"),
  address : {
    building : "1007",
    coord : [ -73.979681, 40.773724 ],
    street : "Morris Park Ave",
    zipcode : "10462"
  },
}
```
### Query Array
```json
{
  _id : ObjectId("5d9b1b9b4b6b9c0b8c0d8b1c"),
  address : {
    building : "1007",
    coord : [ -73.979681, 40.773724 ],
    street : "Morris Park Ave",
    zipcode : "10462"
  },
  languages: [
    "English", "Spanish", "Hindi"
  ]
}
```
```bash
db.trips.find({ "languages": "English" }) // Return all documents that have English in languages array
db.trips.find({ "languages": {$size : 2} }) // Return document have 2 languages
```

```bash

$elemMatch : Tất cả các element trong array phải match với điều kiện

db.trips.find({ "languages": {$elemMatch : { $eq: "English" } } }) // Return all documents that have English in languages array
```
### Query empty fields

```bash
db.trips.find({ "languages": {$exists : false} }) // Trả về tất cả những document nào mà không có fields "language"
```

### Where operator
```bash
db.trips.find({ $where: "this.languages.length > 2" }) // Trả về tất cả những document nào mà có languages.length > 2
```
### Pageination
```bash
db.trips.find().limit(10).skip(10) // Trả về 10 document bắt đầu từ document thứ 10
```
skip : slectPage -1 * limit
### CRUD with Mongo Shell
```bash
db.trips.insertOne({name: "Nguyen Van A"}) // Insert 1 document
db.trips.insertMany([{name: "Nguyen Van A"}, {name: "Nguyen Van B"}]) // Insert nhiều document
db.trips.updateOne({name: "Nguyen Van A"}, {$set: {name: "Nguyen Van B"}}) // Update 1 document
db.trips.updateOne({name: "Nguyen Van A"}, {$set: {"name.lastName": "Nguyen Van B"}}) // Update 1 document nested fields
db.trips.updateMany({name: "Nguyen Van A"}, {$set: {name: "Nguyen Van B"}}) // Update nhiều document
db.trips.deleteOne({name: "Nguyen Van A"}) // Delete 1 document
db.trips.deleteMany({name: "Nguyen Van A"}) // Delete nhiều document
```
### Atomic Operator

`$inc` : Tăng giá trị của field lên 1 giá trị </br>
`$push` : Thêm giá trị vào cuối mảng </br>
`$pull` : Xóa giá trị khỏi mảng </br>
`$set` : Set giá trị cho field </br>
`$unset` : Xóa field </br>
`$addToSet` : Thêm giá trị vào mảng nếu giá trị đó chưa tồn tại </br>

**[⬆ back to top](#table-of-contents)**
### Collection method with mongo shell
```bash
db.trips.drop() // Xóa collection
db.trips.renameCollection("newName") // Đổi tên collection
db.trips.createIndex({name: 1}) // Tạo index cho collection
db.trips.dropIndex({name: 1}) // Xóa index
db.trips.getIndexes() // Lấy danh sách index
db.trips.getIndexes({full: true}) // Lấy danh sách index với chi tiết
```
### Regex
`/\.edu$/` : tìm kiếm các chuỗi kí tự kết thúc bằng edu </br>
`/^1\./` : bắt đầu bằng 1</br>



!function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(o,n,function(r){return e[r]}.bind(null,n));return o},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=5)}([function(e,r){e.exports=require("mongoose")},function(e,r){r.success=(e,r,t="")=>e.send({data:r,message:t}),r.unAuthorized=(e,r)=>error(e,401,r),r.error=(e,r)=>{error(e,500,r)},r.vError=(e,r)=>error(e,400,r),r.cError=(e,r)=>error(e,404,r),r.nError=(e,r)=>error(e,404,r),error=(e,r,t)=>e.status(r).send({message:t})},function(e,r,t){const o=t(3),n=t(4),d=t(1);r.checkToken=(e,r,t)=>{let i=e.headers["x-access-token"]||e.headers.authorization;i&&i.startsWith("Bearer ")&&(i=i.slice(7,i.length)),i?o.verify(i,n.secret,(o,n)=>{o?d.unAuthorized(r,"Token is not valid."):(e.decoded=n,t())}):d.unAuthorized(r,"Authentication token is not supplied.")}},function(e,r){e.exports=require("jsonwebtoken")},function(e,r){e.exports={secret:"mytransaction-management-naveenkumard"}},function(e,r,t){const o=t(6),n=t(7);var d=t(8);const i=t(9),s=t(0);var a=o(),c=process.env.PORT||3001;a.use(n.urlencoded({extended:!0})),a.use(n.json()),a.use(d({credentials:!0,origin:!0})),s.Promise=global.Promise,s.connect(i.url,{useNewUrlParser:!0,useUnifiedTopology:!0}).then(()=>{console.log("Successfully connected to the database")}).catch(e=>{console.log("Could not connect to the database. Exiting now...",e),process.exit()}),a.use(o.static("assets")),a.use(o.static("web")),a.get("/",(e,r)=>{var t=url.parse(e.url,!0);let o="/index.html";t.pathname&&t.pathname.length>0&&"/#"!=t.pathname.substring(0,2)&&(o=t.pathname),r.sendFile("./web"+o,{root:"./"})}),t(10)(a),a.listen(c,()=>{console.log("API Server is listening on port "+c)})},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("body-parser")},function(e,r){e.exports=require("cors")},function(e,r){e.exports={url:"mongodb+srv://naveen:<password>@cluster0-r86wa.mongodb.net/transaction-management?retryWrites=true&w=majority"}},function(e,r,t){"use strict";e.exports=e=>{t(11)(e),t(13)(e),t(16)(e)}},function(e,r,t){"use strict";const o=t(12);e.exports=e=>{e.route("/heartbeat").get(o.get)}},function(e,r,t){"use strict";const o=t(1);r.get=(e,r)=>o.success(r,null,"API is alive.")},function(e,r,t){"use strict";const o=t(2),n=t(14),d="/user";e.exports=e=>{e.post(d,n.create),e.post("/user/login",n.login),e.get("/users",o.checkToken,n.findAll),e.get("/user/:id",o.checkToken,n.findOne),e.put("/user/:id",o.checkToken,n.update),e.put("/user/account/:id",o.checkToken,n.updateAccount),e.delete("/user/:id",o.checkToken,n.delete),e.get("/user/search/:text",o.checkToken,n.search)}},function(e,r,t){"use strict";const o=t(3),n=t(4),d=t(15),i=t(1);r.login=(e,r)=>{if(!e.body.emailId||!e.body.password)return i.vError(r,"Validation failed. Please fill all the required fields.");d.find({$and:[{emailId:e.body.emailId,password:e.body.password,isActive:!0}]}).then(t=>{if(!t||t.length<1)return i.cError(r,"User not found.");let d=o.sign({username:e.body.emailId},n.secret,{expiresIn:"24h"});return i.success(r,{token:d,user:t[0]})}).catch(e=>"ObjectId"===e.kind?i.nError(r,"User not found."):i.error(r,"Internal Server Error."))},r.create=(e,r)=>{if(!(e.body.name&&e.body.description&&e.body.emailId&&e.body.password))return i.vError(r,"Validation failed. Please fill all the required fields.");new d({name:e.body.name,description:e.body.description,emailId:e.body.emailId,password:e.body.password,isActive:!0}).save().then(e=>e&&e._id?i.success(r,e._id):i.cError(r,"User not created. Some problem occurs.")).catch(e=>i.error(r,e.message||"Some error occurred while creating a record."))},r.findAll=(e,r)=>{d.find({isActive:!0}).then(e=>i.success(r,e)).catch(e=>i.error(r,e.message||"Some error occurred while retrieving data."))},r.findOne=(e,r)=>{d.findById(e.params.id).then(t=>t?i.success(r,t):i.cError(r,"Record not found with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Error retrieving record with id "+e.params.id))},r.update=(e,r)=>{if(!(e.body.name&&e.body.description&&e.body.emailId&&e.body.password))return i.vError(r,"Validation failed. Please fill all the required fields.");d.findByIdAndUpdate(e.params.id,{name:e.body.name,description:e.body.description,emailId:e.body.emailId,password:e.body.password},{new:!0}).then(t=>t&&t._id?i.success(r,t._id):i.cError(r,"Error updating record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Error updating record with id "+e.params.id))},r.delete=(e,r)=>{d.findByIdAndUpdate(e.params.id,{isActive:!1},{new:!0}).then(t=>t&&t._id?i.success(r,!0,"Record deleted successfully."):i.cError(r,"Could not delete record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Could not delete record with id "+e.params.id))},r.updateAccount=(e,r)=>{if(!(e.body.bitcoinWalletId&&e.body.bitcoinWalletBalance&&e.body.ethereumWalletId&&e.body.ethereumWalletBalance&&e.body.maxAmountAllowed))return i.vError(r,"Validation failed. Please fill all the required fields.");d.findByIdAndUpdate(e.params.id,{bitcoinWalletId:e.body.bitcoinWalletId,bitcoinWalletBalance:e.body.bitcoinWalletBalance,ethereumWalletId:e.body.ethereumWalletId,ethereumWalletBalance:e.body.ethereumWalletBalance,maxAmountAllowed:e.body.maxAmountAllowed},{new:!0}).then(t=>t&&t._id?i.success(r,t._id):i.cError(r,"Error updating record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Error updating record with id "+e.params.id))},r.search=(e,r)=>{d.find({$and:[{$or:[{name:new RegExp(e.params.text,"i"),emailId:new RegExp(e.params.text,"i")}],isActive:!0}]}).then(e=>i.success(r,e)).catch(e=>i.error(r,e.message||"Some error occurred while retrieving records."))}},function(e,r,t){const o=t(0);var n=o.Schema;const d=o.Schema({name:{type:n.Types.String,maxLength:512},description:{type:n.Types.String,maxLength:1e3},emailId:{type:n.Types.String,maxLength:1e3},password:String,bitcoinWalletId:{type:n.Types.String,maxLength:34,default:null},bitcoinWalletBalance:{type:n.Types.Number,maxLength:1e9,default:null},ethereumWalletId:{type:n.Types.String,maxLength:40,default:null},ethereumWalletBalance:{type:n.Types.Number,maxLength:1e9,default:null},maxAmountAllowed:{type:n.Types.Number,default:null},isActive:Boolean,createdBy:{type:n.Types.ObjectId,default:null},updatedBy:{type:n.Types.ObjectId,default:null}},{timestamps:!0});e.exports=o.model("User",d)},function(e,r,t){"use strict";const o=t(2),n=t(17),d="/transaction";e.exports=e=>{e.post(d,o.checkToken,n.create),e.get(d+"s",o.checkToken,n.findAll),e.get(d+"s/:id",o.checkToken,n.findAll),e.get(d+"s/:status",o.checkToken,n.findAllByStatus),e.get(d+"/:id",o.checkToken,n.findOne),e.put(d+"/:id",o.checkToken,n.update),e.delete(d+"/:id",o.checkToken,n.delete)}},function(e,r,t){"use strict";const o=t(0),n=t(18),d=(t(19),t(1));r.create=(e,r)=>{if(!(e.body.currencyAmount&&e.body.currencyType&&e.body.sourceUserId&&e.body.targetUserId))return d.vError(r,"Validation failed. Please fill all the required fields.");new n({currencyAmount:e.body.currencyAmount,currencyType:e.body.currencyType,sourceUserId:e.body.sourceUserId,targetUserId:e.body.targetUserId,state:"CREATED",isActive:!0}).save().then(e=>e&&e._id?d.success(r,e._id):d.cError(r,"Transaction not created. Some problem occurs.")).catch(e=>d.error(r,e.message||"Some error occurred while creating a record."))},r.findAll=(e,r)=>{n.find({isActive:!0}).then(e=>d.success(r,e)).catch(e=>d.error(r,e.message||"Some error occurred while retrieving data."))},r.findAllByUser=(e,r)=>{n.find({$and:[{$or:[{sourceUserId:o.Types.ObjectId(e.params.id),targetUserId:o.Types.ObjectId(e.params.id)}],isActive:!0}]}).then(e=>d.success(r,e)).catch(e=>d.error(r,e.message||"Some error occurred while retrieving data."))},r.findAllByStatus=(e,r)=>{n.find({state:e.params.status,isActive:!0}).then(e=>d.success(r,e)).catch(e=>d.error(r,e.message||"Some error occurred while retrieving data."))},r.findOne=(e,r)=>{n.findById(e.params.id).then(t=>t?d.success(r,t):d.cError(r,"Record not found with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?d.nError(r,"Record not found with id "+e.params.id):d.error(r,"Error retrieving record with id "+e.params.id))},r.update=(e,r)=>{if(!(e.body.currencyAmount&&e.body.currencyType&&e.body.sourceUserId&&e.body.targetUserId))return d.vError(r,"Validation failed. Please fill all the required fields.");n.findByIdAndUpdate(e.params.id,{currencyAmount:e.body.currencyAmount,currencyType:e.body.currencyType,sourceUserId:e.body.sourceUserId,targetUserId:e.body.targetUserId},{new:!0}).then(t=>t&&t._id?d.success(r,t._id):d.cError(r,"Error updating record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?d.nError(r,"Record not found with id "+e.params.id):d.error(r,"Internal server error. Error updating record with id "+e.params.id))},r.delete=(e,r)=>{n.findByIdAndUpdate(e.params.id,{isActive:!1},{new:!0}).then(t=>t&&t._id?d.success(r,!0,"Record deleted successfully."):d.cError(r,"Could not delete record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?d.nError(r,"Record not found with id "+e.params.id):d.error(r,"Internal server error. Could not delete record with id "+e.params.id))}},function(e,r,t){const o=t(0);var n=o.Schema;const d=o.Schema({currencyAmount:Number,currencyType:String,sourceUserId:n.Types.ObjectId,targetUserId:n.Types.ObjectId,processedAt:Date,state:String,isActive:Boolean,createdBy:{type:n.Types.ObjectId,default:null},updatedBy:{type:n.Types.ObjectId,default:null}},{timestamps:!0});e.exports=o.model("Transaction",d)},function(e,r){r.clone=e=>JSON.parse(JSON.stringify(e))}]);
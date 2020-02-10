!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t){e.exports=require("mongoose")},function(e,t){t.success=(e,t,r="")=>e.send({data:t,message:r}),t.unAuthorized=(e,t)=>error(e,401,t),t.error=(e,t)=>{error(e,500,t)},t.vError=(e,t)=>error(e,400,t),t.cError=(e,t)=>error(e,404,t),t.nError=(e,t)=>error(e,404,t),error=(e,t,r)=>e.status(t).send({message:r})},function(e,t,r){const n=r(3),o=r(4);var s=r(5);const i=r(6),c=r(0);var a=n(),u=process.env.PORT||3001;a.use(o.urlencoded({extended:!0})),a.use(o.json()),a.use(s({credentials:!0,origin:!0})),c.Promise=global.Promise,c.connect(i.url,{useNewUrlParser:!0,useUnifiedTopology:!0}).then(()=>{console.log("Successfully connected to the database")}).catch(e=>{console.log("Could not connect to the database. Exiting now...",e),process.exit()}),a.use(n.static("assets")),a.use(n.static("web")),a.get("/",(e,t)=>{var r=url.parse(e.url,!0);let n="/index.html";r.pathname&&r.pathname.length>0&&"/#"!=r.pathname.substring(0,2)&&(n=r.pathname),t.sendFile("./web"+n,{root:"./"})}),r(7)(a),a.listen(u,()=>{console.log("API Server is listening on port "+u)})},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("cors")},function(e,t){e.exports={url:"mongodb+srv://naveen:nvnkmr%40123@cluster0-r86wa.mongodb.net/pricing-intelligence?retryWrites=true&w=majority"}},function(e,t,r){"use strict";e.exports=e=>{r(8)(e),r(10)(e)}},function(e,t,r){"use strict";const n=r(9);e.exports=e=>{e.route("/heartbeat").get(n.get)}},function(e,t,r){"use strict";const n=r(1);t.get=(e,t)=>n.success(t,null,"API is alive.")},function(e,t,r){"use strict";const n=r(11),o="/product";e.exports=e=>{e.get(o+"/websites",n.findAllWebsites),e.get(o+"/brands/:website",n.findAllBrands),e.get(o+"/categories/:website",n.findAllCategories),e.post(o+"s",n.findAll)}},function(e,t,r){"use strict";r(0);const n=r(12),o=r(1);t.findAll=(e,t)=>{let r={isActive:!0,website:e.body.website};"brand"===e.body.productType?r.brand=e.body.type:r.category=e.body.type,n.find(r).then(e=>o.success(t,e)).catch(e=>o.error(t,e.message||"Some error occurred while retrieving data."))},t.findAllWebsites=(e,t)=>{n.find({isActive:!0}).distinct("website").then(e=>o.success(t,e)).catch(e=>o.error(t,e.message||"Some error occurred while retrieving data."))},t.findAllBrands=(e,t)=>{n.find({isActive:!0,website:e.params.website}).distinct("brand").then(e=>o.success(t,e)).catch(e=>o.error(t,e.message||"Some error occurred while retrieving data."))},t.findAllCategories=(e,t)=>{n.find({isActive:!0,website:e.params.website}).distinct("category").then(e=>o.success(t,e)).catch(e=>o.error(t,e.message||"Some error occurred while retrieving data."))}},function(e,t,r){const n=r(0);var o=n.Schema;const s=n.Schema({website:String,name:String,url:String,brand:String,imageURL:String,price:Number,mrp:Number,packingQty:String,moq:String,discount:Number,category:String,categoryPath:String,isActive:Boolean,createdBy:{type:o.Types.ObjectId,default:null},updatedBy:{type:o.Types.ObjectId,default:null}},{timestamps:!0});e.exports=n.model("Product",s)}]);
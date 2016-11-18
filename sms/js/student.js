/**
 * Created by Administrator on 2016/10/11.
 */
//匿名函数调用
(function init(dbName,storeName) {
    //创建数据库
    var request=window.indexedDB.open(dbName);
    request.onupgradeneeded=function (event) {
        var db=event.target.result;
        if(db.objectStoreNames.contains(storeName)){
            db.deleteObjectStore(storeName)
        }
        db.createObjectStore(storeName,{
            keyPath:"id",
            autoIncrement:true
        });
    }
})("sms","Students");
//获取仓库---注意把浏览器已建的仓库缓存删除
function getStore(handler,storeName) {
    //开始获取数据库
    var request = window.indexedDB.open("sms");
    //获取数据库成功
    request.onsuccess = function () {
        //取得数据库对象
        var db = this.result;
        //开启事务
        var transaction = db.transaction(storeName,"readwrite");
        //打开对象仓库
        var store = transaction.objectStore(storeName);
        //调用回调函数，将仓库返回给给方法调用者
        handler(store);
    }
}
function Student(name,age,gender,address) {
    this.name=name;
    this.age=age;
    this.gender=gender;
    this.address=address
}
//保存
function saveStudent(student,handler) {
    //获取仓库
    getStore(function (store) {
        //保存
        var request=store.put(student);
        //处理保存成功事件
        request.onsuccess=function (event) {
            handler(event)
        }
    },"Students")
}
//查询
function findAllStudent(handler) {
    //获取仓库
    getStore(function (store) {
        //查询
        var request=store.getAll();
        //处理查询成功事件
        request.onsuccess=function (event) {
            handler(event)
        }
    },"Students")
}
//删除
function deleteStudent(key,handler) {
    getStore(function (store) {
        var request=store.delete(key);
        request.onsuccess=function (event) {
            handler(event)
        }
    },"Students")
}
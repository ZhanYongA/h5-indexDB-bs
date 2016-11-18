/**
 * Created by Administrator on 2016/10/11.
 */
function search() {
   findAllStudent(function () {
        var result=event.target.result;
            //删除原有的
            $(".tb1>tbody").children(":not(:first)").remove();
            result.forEach(function (item) {
                //克隆行
                var newTr=$(".hiddenTr").clone().removeClass("hiddenTr");
                //将内容填充
                newTr.find(":checkbox").val(item.id);
                newTr.children().eq(1).text(item.name);
                newTr.children().eq(2).text(item.gender);
                newTr.children().eq(3).html(item.age);
                newTr.children().eq(4).html(item.address);

                $(".tb1>tbody").append(newTr);
            })
        });
}

$(function () {
    search();
    $("button").eq(1).off("click");
    $("button").eq(1).click(function () {
        var idd=$(":checkbox:checked");
        console.log(idd.val());
        var ids=idd.map(function (index,item) {
            return +$(item).val();
        }).get();
        console.log("ids:"+ids);
        //批量删除
        ids.forEach(function (id) {
            deleteStudent(id,function () {
                search()
            })
        })
    })
});

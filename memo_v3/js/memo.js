"use strict";
window.addEventListener("DOMContentLoaded",
function(){
    if(typeof this.localStorage === "undefined"){
        window.alert("このブラウザはLocal Storage機能が実装されていません");
        return;
    }else{
        viewStorage();
        savelocalStorage();
        delLocalStorage();
        allClearLocalStorage();
        selectTable();
    }
},false
);
//LocalStorageへの保存
function savelocalStorage(){
    const save = document.getElementById("save");
    save.addEventListener("click",
    function(e){
        e.preventDefault();
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        if(key =="" || value ==""){
            Swal.fire({
                title: "Memo app",
                html: "Key, Memoはいずれも必須です。",
                type: "error",
                allowOutsideClick : false
            });
            return;
        }else{
            let w_msg = "LocalStorageに \n「" + key + " " + value + "」\nを保存しますか？"; 
            Swal.fire({
                title: "Memo app"
                ,html: w_msg
                ,type: "question"
                ,showCancelButton : true
            }).then(function(result){
                if(result.value === true){
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに " + key + " " + value + " を保存しました。";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        allowOutsideClick : false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }
    }, false
    );
};
//Data for 削除 --localStorageから選択されている行を削除
function delLocalStorage(){
    const del = document.getElementById("del");
    del.addEventListener("click",
    function(e){
        e.preventDefault();
        const chkbox1 = document.getElementsByName("chkbox1");
        const table1 = document.getElementById("table1");
        let w_cnt = "0";
        w_cnt = selectCheckBox("del");
        
        if(w_cnt >= 1){
            let w_msg = ("LocalStorageから選択されている "+w_cnt +" 件を削除しますか？");
            Swal.fire({
                title: "Memo app"
                ,html: w_msg
                ,type: "question"
                ,showCancelButton : true
            }).then(function(result){
                if(result.value === true){
                    for(let i=0; i < chkbox1.length; i++){
                        if(chkbox1[i].checked){
                            localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                        }//version-up3 add
                    }//version-up3 add
                viewStorage();
                let w_msg = "LocalStorageから " + w_cnt + " 件を削除しました。";
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg,type: "success",
                        allowOutsideClick : false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });

        }
    }, false
    );

    const table1 = document.getElementById("table1");
    table1.addEventListener("click", (e) =>{
        if(e.target.classList.contains("trash") === true){
            let index = e.target.parentNode.parentNode.rowIndex
            const key = table1.rows[index].cells[1].firstChild.data;
            const value = table1.rows[index].cells[2].firstChild.data;
            let w_delete = `LocalStorageから\n 「${key} ${value}」\nを削除しますか？`;
            Swal.fire({
                title : "Memo app",
                html : w_delete,
                type : "question",
                showCancelButton : true
            }).then(result => {
                if(result.value === true){
                    localStorage.removeItem(key);
                    viewStorage();
                    let w_msg = `LocalStorageから ${key} ${value} を削除しました。！`;
                    Swal.fire({
                        title : "Memo app",
                        html : w_msg,
                        type : "success",
                        allowOutsideClick : false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            })
        }
    });
};

//Data for  全て削除
function allClearLocalStorage(){
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
    function(e){
        e.preventDefault();

        let w_msg = ("LocalStorageのデータをすべて削除します。\nよろしいでしょうか?");
            Swal.fire({
                title: "Memo app"
                ,html: w_msg
                ,type: "question"
                ,showCancelButton : true
            }).then(function(result){
                if(result.value === true){
                    localStorage.clear();
                    viewStorage();
                    let w_msg = "LocalStorageのデータをすべて削除しました。";
                    Swal.fire({
                        title: "Memo app",
                        html: w_msg,
                        type: "success",
                        showCancelButton : false
                    })
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";                   
                }
            });
        },false
    );
};

//Data for 選択
function selectTable(){
    const select = document.getElementById("select");
    select.addEventListener("click",
    function(e){
        e.preventDefault();
        selectCheckBox("select");
    },false
    );
};

//Data for CheckBox
function selectCheckBox(mode){
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";

    for(let i=0; i < chkbox1.length; i++){
        if(chkbox1[i].checked){
            if(w_cnt === 0){
                w_textKey = table1.rows[i+1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i+1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }

    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;

if(mode === "select"){
    if(w_cnt === 1){
        return w_cnt;
    }
    else{
        Swal.fire({
            title: "Memo app",
            html: "1つ選択してください。",
            type: "error",
            allowOutsideClick : false
        });
    }
}
if(mode === "del"){
    if(w_cnt >= 1){
        return w_cnt;
    }
    else{
        Swal.fire({
            title: "Memo app",
            html: "1つ以上選択してください。",
            type: "error",
            allowOutsideClick : false
        });
    }
}
};

function viewStorage(){
    const list = document.getElementById("list");
    while(list.rows[0]) list.deleteRow(0);

    for (let i=0; i < localStorage.length; i++){
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML = "<img src='img/trash_icon.png' class='trash'>";
    }
    //data for sortList of jQuery
    $("#table1").tablesorter({
        sortList: [[1,0]]
    });
    
    $("#table1").trigger("update");
}

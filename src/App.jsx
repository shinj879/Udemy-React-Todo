import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  //引数の「event」は「e」で表記することも多い。eventには、↓のonChagngeで変更があったときに入ってくるイベント。だが実際には、event.target.value に、inputで入力した内容が入ってくる。
  //ここでは、テキストボックスに入力された内容を、setTodoTextでtodoTextに入れている。

  const onClickAdd = () => {
    //追加ボタンを押したときに、テキストボックスの入力内容を未完了のTODOの欄に追加する処理
    if (todoText === "") return; //テキストボックスに何も入力しない状態で追加ボタンを押した場合、↓の処理が起きないようにしている。
    const newTodos = [...incompleteTodos, todoText];
    //...はスプレッド構文。もうすでにincompleteTodosに入っている要素も読み込む必要があるので、
    //新しい配列にスプレッド構文でその要素を展開し、テキストボックスで受け取った内容（todoText）もその配列の中に入れている。
    setIncompleteTodos(newTodos); //↑で作った配列をinCompleteTodosに改めて入れなおしている。
    setTodoText("");
  };

  const onClickDelete = (index) => {
    //indexは、incompleteTodos.map（）の第二引数で設定したindex（インデックス番号が入ってくるやつ）のこと。
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); // .splice は、配列に使うメソッド。　第一引数に配列のインデックス（何番目か）を指定し、第二引数に削除したい個数を入れる。ちなみに第三引数もあり、新しく要素を追加する機能がある。
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        {/**　onChangeがなければ、valueにtodoTextのデフォルト値（空文字）が入ってくるので、入力できない。 
      なのでonChangeを書いて、テキストボックスに文字が入ってきたら、state（todoTextのこと）の値も変更するようにしている。
       onChange=の{}の中身は、inputに変更があった場合の処理を書いている。（処理は変数で書いている）
       要はonChangeは、inputoに何か変更があったときに、別の処理をするっていう使い方をする。
       ここでは、↑で定義したonChangeTodoText関数が、onChangeの処理内容として書かれている。
       onChangeTodoTextが起動すると、中のsetTodoText(event.target.value)が起動し、todoTextに入力した値が入ってくる。*/}
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            /**useStateのデフォルト値を繰り返して処理している ループさせる処理はkeyを書く。*/
            // map()の第二引数を設定してあげると、配列のインデックス番号（配列の順番。０からスタートする）が０から順番に入ってくる。
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>　
                {/**onClickDelete(index)だけだと、ここで関数が実行されてしまうので（なぜこの時点で実行されるのかは分からない。onClickを設定したのだから、クリックしたときに実行されるのでは？）、 アロー関数にしてあげる。*/}
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title ">完了したTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

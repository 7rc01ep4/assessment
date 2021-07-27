'use strict';

const userNameInput = document.getElementById('user-name'); //入力エリア
const assessmentButton = document.getElementById('assessment'); //診断ボタン
const resultDivided = document.getElementById('result-area'); //結果表示エリア
const tweetDivided = document.getElementById('tweet-area'); //ツイートボタン
 //htmlのidをjsで使えるように紐付けている

 userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

 assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return
  } //名前が空のときは終了

  console.log(userName); //ログに入力した名前表示


  //今ある診断結果を削除する(ボタンを押したら既に表示されているところを無に置き換えてから下に行く)
  resultDivided.innerText = "";

  //診断結果表示エリア
  const header = document.createElement('h3'); //h3タグを作る
  header.innerText = '診断結果'; //「診断結果」と書き込む
  resultDivided.appendChild(header); //resultDividedの子要素になる

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  //ツイートエリア作成
  tweetDivided.innerText = ""; //初期化（ダブらないようにする）

  const anchor = document.createElement('a'); //aタグを作る
  const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたのいいところ') + '&ref_src=twsrc%5Etfw'; //定数にツイートリンクを指定

  anchor.setAttribute('href',hrefValue); //
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result)
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src','https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script)


  
};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す変数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
*/

function assessment(userName){
  let sumOfCharCode = 0; //charcodeの合計の計算
  for (let i = 0; i < userName.length; i++){
    //usernameを0文字目からusernameの文字数まで+1して繰り返す
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
     //出た数字を足していく
  }

  const index = sumOfCharCode % answers.length; //出た数字を診断結果の数で割る
  let result = answers[index]; //index番目の結果をresultとして表示

  result = result.replaceAll('{userName}',userName)
  return result; //resultを教えてくれる

}

//テストコード
console.assert(
  assessment('太郎') ===　assessment('太郎'),
  '同じ入力名で異なる結果が出ています。'
)

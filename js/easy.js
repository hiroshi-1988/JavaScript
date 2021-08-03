'use strict';

    //htmlのidからデータを取得
    //取得したデータを変数に代入
    const timer = document.getElementById('timer');
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');

    //指定タイムの変数定義
    let specifiedTime;

    //秒の変数定義
    let sec;

    //クリック時の時間を保持するための変数定義
    let startTime;

    //経過時刻を更新するための変数。初めだから0で初期化
    let elapsedTime = 0;

    //タイマーを止めるにはclearTimeoutを使う必要があり、そのためにはclearTimeoutの引数に渡すためのタイマーのidが必要
    let timerId;

    //ミリ秒の表示ではなく、分とか秒に直すための関数。他のところからも呼び出すので別関数として作る
    //計算方法として135200ミリ秒経過したとしてそれを分とか秒に直すと -> 02:15:200
    function updateTimetText(){

        //sec(秒) = 135200 / 1000ミリ秒で秒数に直し(135.2秒)、小数点以下(.2秒)は切り捨て % 60 で分の余りが15秒
        sec = Math.floor(elapsedTime / 1000) % 60;

        //文字列の末尾1桁を表示したいのでsliceで負の値(-1)引数で渡してやる
        sec = ('0' + sec).slice(-1);

        //HTMLのid timer部分に表示させる
        timer.textContent = sec;
        
    }

    //再帰的に使える用の関数
    function countUp(){

        //setTimeoutで1ミリ秒後にfanctionを開始
        timerId = setTimeout(function(){

            //経過時刻は現在時刻をミリ秒で示すnew Date().getTime()からstartを押した時の時刻(startTime)を引く
            elapsedTime = new Date().getTime() - startTime;
            
            //updateTimetText関数で分・秒・ミリ秒を計算してHTMLに記録
            updateTimetText();

            //1ミリ秒毎に上のcountUp関数を呼び出す
            countUp();

        //1秒以下の時間を表示するために1ミリ秒後に始めるよう宣言
        },1);
    }

    //starボタンを押すとタイマーが始まる
        document.getElementById('start').onclick = function(){
        
        //指定タイムをランダムで設定
        specifiedTime = String(Math.floor(Math.random() * 9));
        document.getElementById('specified').textContent = specifiedTime;

        //現在時刻を示すnew Date().getTime();を代入
        startTime = new Date().getTime();

        //再帰的に使えるように関数を作る
        countUp();
    };

        //ここからタイマー止め&スコア表示
        //stopボタンを押す
        document.getElementById('stop').onclick = function() {
            
            //clearTimeoutはsetTimeoutを止める為の関数
            clearTimeout(timerId);
            
            //スコア表示(〇×)
            if(sec === specifiedTime) {
            document.getElementById('score').insertAdjacentHTML('beforeend', '<td>〇</td>');
            } else {
            document.getElementById('score').insertAdjacentHTML('beforeend', '<td>×</td>');
            }
            
            //スコア表示(合否&リセット)
            //合格を見極め(〇の回数をカウント)
            let circle= document.getElementById('score').textContent;
            circle = (circle.match( /〇/g ) || [] ).length ;
            
            //回数計算
            let count = document.getElementById('score').textContent.length;
            
            //合格・不合格条件&リセット条件
            if(circle >= 3 && count === 5) {
                document.getElementById('score').insertAdjacentHTML('beforeend', '<td>合格</td>');
            } else if (circle < 3 && count === 5){
                document.getElementById('score').insertAdjacentHTML('beforeend', '<td>不合格</td>');
            } else if(count > 5) {
                document.getElementById('score').textContent = '';
                    if(sec === specifiedTime) {
                    document.getElementById('score').insertAdjacentHTML('beforeend', '<td>〇</td>');
                    } else {
                    document.getElementById('score').insertAdjacentHTML('beforeend', '<td>×</td>');
                    }
                }
    };

    //フォーム切り替え
    const mode = document.querySelector('h2').textContent;

    if(mode === '- easy mode -') {
        document.querySelector('option[value="index.html"]').selected = true;
    } else if(mode === '- normal mode -') {
        document.querySelector('option[value="index-normal.html"]').selected = true;
    } else if(mode === '- hard mode -') {
        document.querySelector('option[value="index-hard.html"]').selected = true;
    }

    document.getElementById('form').select.onchange = function() {
        location.href = document.getElementById('form').select.value;
    }
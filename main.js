const data = [
  { no: 1, name: "全音符", mean: "4分の4拍子の1小節の長さ" },
  { no: 2, name: "付点2分音符", mean: "2分音符+4分音符の長さ" },
  { no: 3, name: "2分音符", mean: "全音符の半分の長さ" },
  { no: 4, name: "付点4分音符", mean: "4分音符+8分音符の長さ" },
  { no: 5, name: "4分音符", mean: "全音符の4分の1の長さ" },
  { no: 6, name: "付点8分音符", mean: "8分音符+16分音符の長さ" },
  { no: 7, name: "8分音符", mean: "全音符の8分の1の長さ" },
  { no: 8, name: "16分音符", mean: "全音符の16分の1の長さ" },
  { no: 9, name: "全休符", mean: "全音符と同じ長さを休む" },
  { no: 10, name: "2分休符", mean: "2分音符と同じ長さを休む" },
  { no: 11, name: "4分休符", mean: "4分音符と同じ長さを休む" },
  { no: 12, name: "8分休符", mean: "8分音符と同じ長さを休む" },
  { no: 13, name: "16分休符", mean: "16分音符と同じ長さを休む" },
  { no: 14, name: "ト音記号", mean: "五線上で「ソ」の位置を示す" },
  { no: 15, name: "ヘ音記号", mean: "五線上で「ファ」の位置を示す（低い音を表すとき）" },
  { no: 16, name: "4分の2拍子", mean: "4分音符を1拍として、1小節に2拍入る" },
  { no: 17, name: "4分の3拍子", mean: "4分音符を1拍として、1小節に3拍入る" },
  { no: 18, name: "4分の4拍子", mean: "4分音符を1拍として、1小節に4拍入る" },
  { no: 19, name: "8分の6拍子", mean: "8分音符を1拍として、1小節に6拍入る" },
  { no: 20, name: "シャープ", mean: "半音上げる" },
  { no: 21, name: "フラット", mean: "半音下げる" },
  { no: 22, name: "ナチュラル", mean: "もとの音に戻す" },
  { no: 23, name: "フォルテッシモ", mean: "非常に強く" },
  { no: 24, name: "フォルテ", mean: "強く" },
  { no: 25, name: "メッゾフォルテ", mean: "やや強く" },
  { no: 26, name: "メッゾピアノ", mean: "やや弱く" },
  { no: 27, name: "ピアノ", mean: "弱く" },
  { no: 28, name: "ピアニッシモ", mean: "非常に弱く" },
  { no: 29, name: "クレッシェンド", mean: "だんだん強く" },
  { no: 30, name: "デクレッシェンド", mean: "だんだん弱く" },
  { no: 31, name: "タイ", mean: "同じ高さの音をつなげる" },
  { no: 32, name: "スラー", mean: "違う高さの音をつなげる" },
  { no: 33, name: "スタッカート", mean: "その音を短く切って演奏する" },
  { no: 34, name: "テヌート", mean: "その音（が表現している時間）を十分に保って演奏する" },
  { no: 35, name: "アクセント", mean: "その音だけを強く演奏する" },
  { no: 36, name: "フェルマータ", mean: "その音を（約2倍）十分にのばして演奏する" },
  { no: 37, name: "リピート", mean: "繰り返して演奏する" },
  { no: 38, name: "(8分)連符", mean: "2つの(8分)音符をつなげて表記する" },
  { no: 39, name: "(16分)連符", mean: "3つの(16分)音符をつなげて表記する" },
  { no: 40, name: "(1拍)3連符", mean: "１拍の中に(8分)音符を3等分して演奏する" },
];
const sound_name = ["alert", "kako", "move1", "move2", "pi", "reset", "right", "seikai", "seikai2", "set"];
const IMG = [];
const se = [];
var index = 0;
var score = 0;
var result="";
let hairetu = [];
let arr = [];
let flag = [];

init();

//初期設定
function init() {
  button_flash.addEventListener("click", () => {
    flash_init();
  });

  button_quiz.addEventListener("click", () => {
    quiz_init();
  });

  img_load();
  se_load();
}

// 画像のプリロード(大事)
function img_load() {
  for (let i = 0; i < data.length; i++) {
    IMG[i] = new Image();
    IMG[i].src = `image/ongaku${i + 1}.png`;
  }
}

//　音楽のプリロード
function se_load() {
  for (let i = 0; i < sound_name.length; i++) {
    se[i] = new Howl({
      src: [`sound/${sound_name[i]}.mp3`],
      preload: true, // 事前ロード
      volume: 1.0, // 音量(0.0〜1.0の範囲で指定)
      loop: false, // ループ再生するか
      autoplay: false, // 自動再生するか
    });
  }
}

// 配列の入れ替え・設定
function hairetu_init() {
  hairetu = [];
  arr = [];
  flag = [];
  for (let j = 0; j < data.length; j++) {
    hairetu[j] = j;
    flag[j] = false;
  }
  for (let j = 0; j < data.length; j++) {
    arr.push(...hairetu.splice(Math.floor(Math.random() * hairetu.length - 1), 1));
  }
  index = -1;

  //ボタンの設定
  box_name.innerText = "「つぎ」を押して練習を始めます。";
  box_mean.innerText = "";
  NO.innerText = "0/40";
}

//音楽記号フラッシュ　呼び出し
function flash_init() {
  se[5].currentTime = 0;
  se[5].play();
  //コンテンツの設定
  content.innerHTML = `
  <div class="card-style">
    <h1 class="mt-3 text-center">🎵 音楽記号：フラッシュカード 🎵</h1>
    <div id="box" class="mt-5 text-center" style="width:200px;height:200px;margin:0 auto;">
      <img id="box_img" style="width:200px;height:200px;border-radius:10px;box-shadow:0 4px 8px rgba(0,0,0,0.1);" alt="音楽記号の画像" />
    </div>
    <div style="display: flex;justify-content: center;margin-left: -72px;">
      <table class="table mt-3 table-bordered border-primary w-75" role="table" aria-label="音楽記号の情報">
        <tr class="table-danger">
          <td style="font-size:24px;width:72px">名前</td>
          <td id="box_name" class="h2 text-center" role="cell" aria-live="polite"></td>
        </tr>
        <tr class="table-primary">
          <td style="font-size:24px;width:72px">意味</td>
          <td id="box_mean" class="h3 text-center" role="cell" aria-live="polite"></td>
        </tr>
      </table>
    </div>
    <h6 id="NO" class="text-center" aria-live="polite"></h6>
    <div class="text-center">
      <button id="button_prev" class="mx-5 btn btn-primary fun-button" aria-label="前の問題に戻る">⬅️ もどる</button>
      <button id="button_set_flash" class="mx-5 btn btn-danger fun-button" aria-label="問題をシャッフルする">🔀 シャッフル</button>
      <button id="button_next" class="mx-5 btn btn-primary fun-button" aria-label="次の問題に進む">つぎ ➡️</button>
    </div>
  </div>
`;
  box_img.src = "";
  hairetu_init();

  button_next.addEventListener("click", () => {
    index = parseInt(index + 1) % (data.length * 2);
    flash_show();
  });

  button_prev.addEventListener("click", () => {
    index = parseInt(index - 1) % (data.length * 2);
    if (index < 0) index = data.length * 2 - 1;
    flash_show();
  });

  button_set_flash.addEventListener("click", () => {
    se[9].play();
    const res = confirm("順番をシャッフルしますか？");
    if (res === true) {
      flash_init();
    }
  });
}

//音楽記号クイズ　呼び出し
function quiz_init() {
  se[5].currentTime = 0;
  se[5].play();
  score = 0;
  content.innerHTML = `
  <div class="card-style">
    <h1 class="mt-3 text-center">🎯 音楽記号：クイズ 🎯</h1>
    <h6 id="NO" class="text-center" aria-live="polite"></h6>

    <div style="display: flex;justify-content: center;margin-left: -72px;">
      <table class="table mt-3 table-bordered border-primary w-75" role="table" aria-label="問題の情報">
        <tr class="table-danger">
          <td style="font-size:24px;width:72px">名前</td>
          <td id="box_name" class="h2 text-center" role="cell" aria-live="polite"></td>
        </tr>
        <tr class="table-primary">
          <td style="font-size:24px;width:72px">意味</td>
          <td id="box_mean" class="h3 text-center" role="cell" aria-live="polite"></td>
        </tr>
      </table>
    </div>
    <form id="select" name="select" class="text-center" role="radiogroup" aria-label="表示モード選択">
      <label class="mx-3 h5">
        <input type="radio" name="select" value="0" checked aria-describedby="mode-help"/>📝 どちらも見せる
      </label>
      <label class="mx-3 h5">
        <input type="radio" name="select" value="1" aria-describedby="mode-help"/>❓ 意味をかくす
      </label>
      <label class="mx-3 h5">
        <input type="radio" name="select" value="2" aria-describedby="mode-help"/>🔍 名前をかくす
      </label>
    </form>
    <div id="mode-help" class="sr-only">表示したい情報を選択してください</div>
    <div style="display: flex;justify-content: center;">
     <table id="list_table" class="mt-3" role="grid" aria-label="音楽記号選択グリッド">
     </table>
    </div>
    <div class="text-center mt-3">
      <button id="button_prev" class="mx-5 btn btn-primary fun-button" aria-label="前の問題に戻る">⬅️ もどる</button>
      <button id="button_set_quiz" class="mx-5 btn btn-danger fun-button" aria-label="問題をシャッフルする">🔀 シャッフル</button>
      <button id="button_next" class="mx-5 btn btn-primary fun-button" aria-label="次の問題に進む">つぎ ➡️</button>
    </div>
  </div>
  `;
  hairetu_init();

  list_table.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 8; j++) {
      const td = document.createElement("td");
      td.style.textAlign = "center";
      td.style.border = "none";
      const button = document.createElement("button");
      button.classList.add("kigo");
      button.setAttribute("aria-label", `音楽記号 ${data[i * 8 + j]?.name || '記号'} を選択`);
      button.addEventListener("click", () => {
        // 既存のクラスをリセット
        document.querySelectorAll('.kigo').forEach(btn => {
          btn.classList.remove('correct', 'incorrect');
        });

        if (parseInt(i * 8 + j) === arr[index]) {
          button.classList.add('correct');
          if (flag[index] === false) {
            flag[index] = true;
            result = "正解済";
            score++;
            se[7].currentTime = 0;
            se[7].play();
            showSuccessEffect();
          }
        } else {
          button.classList.add('incorrect');
          se[1].currentTime = 0;
          se[1].play();
        }
        NO.innerText = `${parseInt(index + 1)}/40　${score}問正解　(${result})`;
      });
      const img = document.createElement("img");
      img.style.width = "55px";
      img.src = IMG[i * 8 + j].src;
      button.appendChild(img);
      td.appendChild(button);
      tr.appendChild(td);
    }
    list_table.appendChild(tr);
  }

  button_next.addEventListener("click", () => {
    index = parseInt(index + 1) % data.length;
    quiz_show();
  });

  button_prev.addEventListener("click", () => {
    index = parseInt(index - 1) % (data.length * 2);
    if (index < 0) index = data.length - 1;
    quiz_show();
  });

  button_set_quiz.addEventListener("click", () => {
    se[9].play();
    const res = confirm("順番をシャッフルしますか？");
    if (res === true) {
      quiz_init();
    }
  });
}

function flash_show() {
  se[4].currentTime = 0;
  se[4].play();
  const i = arr[parseInt(index / 2)];
  NO.innerText = parseInt(index / 2 + 1) + "/40";
  box_img.src = IMG[i].src;
  if (index % 2 === 0) {
    box_name.innerText = "?";
    box_mean.innerText = "?";
  } else {
    box_name.innerText = data[i].name;
    box_mean.innerText = data[i].mean;
  }
}

function quiz_show() {
  se[4].currentTime = 0;
  se[4].play();

  if (flag[index] === true) {
    result = "正解済";
  } else {
    result = "未正解";
  }

  const i = arr[parseInt(index)];
  NO.innerText = `${parseInt(index + 1)}/40　${score}問正解　(${result})`;
  if (select[1].checked) {
    box_mean.innerText = "";
  } else {
    box_mean.innerText = data[i].mean;
  }
  if (select[2].checked) {
    box_name.innerText = "";
  } else {
    box_name.innerText = data[i].name;
  }
}

// 正解時の視覚的演出
function showSuccessEffect() {
  // 背景グラデーション効果
  document.body.classList.add('correct-background');
  setTimeout(() => {
    document.body.classList.remove('correct-background');
  }, 1500);

  // フラッシュエフェクト
  const flash = document.createElement('div');
  flash.className = 'success-flash';
  document.body.appendChild(flash);
  setTimeout(() => {
    document.body.removeChild(flash);
  }, 500);

  // 紙吹雪エフェクト
  createConfetti();
}

// 紙吹雪エフェクトの生成
function createConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti';
  document.body.appendChild(confettiContainer);

  // ランダムな数の紙吹雪を生成
  const confettiCount = Math.floor(Math.random() * 30) + 20;

  for (let i = 0; i < confettiCount; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.className = 'confetti-piece';

    // ランダムな位置とタイミング
    confettiPiece.style.left = Math.random() * 100 + '%';
    confettiPiece.style.animationDelay = Math.random() * 2 + 's';
    confettiPiece.style.animationDuration = (Math.random() * 2 + 2) + 's';

    confettiContainer.appendChild(confettiPiece);
  }

  // 3秒後に紙吹雪を削除
  setTimeout(() => {
    if (document.body.contains(confettiContainer)) {
      document.body.removeChild(confettiContainer);
    }
  }, 3000);
}


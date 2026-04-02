function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('2077 考古隊：家鄉遺物鑑定科')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getGameData() {
  var allArtifacts = [
    { name: "黑盒子有 0-9 圓圈，連著放耳朵的長條物", correct: "撥盤式電話", hint: "以前沒螢幕時的通訊工具" },
    { name: "彩色塑膠卡片印著 100 元，要插進公用機器", correct: "電話卡", hint: "打公用電話必備的卡片" },
    { name: "木頭板子中間挖了烏龜形狀的洞，有漂亮刻紋", correct: "紅龜粿模具", hint: "做傳統紅色烏龜點心的工具" },
    { name: "透明方塊盒子，裡面捲著兩圈黑色細磁帶", correct: "錄音帶", hint: "以前用來錄音或聽歌的匣子" },
    { name: "巨大圓形石盤，中間有洞，轉動會磨出豆漿", correct: "石磨", hint: "古代用來磨豆子或米的機器" },
    { name: "紅、藍、綠三色橫條紋的塑膠提袋", correct: "茄芷袋", hint: "台灣最有名的傳統購物袋" },
    { name: "厚厚的紙本大書，裡面印滿了全台灣人的號碼", correct: "電話簿", hint: "以前找人電話要翻這本" },
    { name: "鐵製重物，燒熱後用來把衣服壓得平整", correct: "熨斗", hint: "讓衣服不皺的小幫手" },
    { name: "圓形小鐵片，邊緣有鋸齒，小孩在地上彈射", correct: "尪仔標", hint: "以前最流行的紙牌對戰遊戲" },
    { name: "竹子編成的遮陽帽，農夫下田時必帶", correct: "斗笠", hint: "用竹葉編成的遮陽擋雨帽" },
    { name: "腰帶上的小盒子，會嗶嗶叫並顯示數字", correct: "BB Call", hint: "手機流行前的隨身聯絡器" },
    { name: "手動旋轉的機器，把米放入會蹦出巨大響聲", correct: "爆米香機", hint: "製作傳統米點心的壓力機" },
    { name: "灰色的遊戲機，要插大卡帶才能玩瑪利歐", correct: "紅白機", hint: "阿公年代最紅的電視遊戲機" },
    { name: "彩色玻璃小珠子，古代小孩在地上彈來彈去", correct: "彈珠", hint: "圓圓的、亮亮的玻璃玩具" },
    { name: "鐵皮做的漏斗燈，要裝油點火，以前沒電時用", correct: "煤油燈", hint: "早期用來照明的燈具" },
    { name: "木頭做的長板，以前廟口或家門口乘涼坐的", correct: "長板凳", hint: "可以坐很多人的長型椅子" },
    { name: "腳踏式木頭機器，轉動會把稻穀的殼吹掉", correct: "風選機", hint: "農夫用來分離穀殼的工具" },
    { name: "抓魚用的竹編籠子，放在河裡魚就進不去了", correct: "魚筌", hint: "竹子編成的陷阱式抓魚工具" },
    { name: "寫著地名的小紙片，以前搭火車要剪洞進站", correct: "火車票", hint: "乘車必備的紙質憑證" },
    { name: "長得像漏斗的鐵皮便當盒，有三四層高", correct: "鐵便當盒", hint: "以前學生帶午餐用的容器" },
    { name: "陶瓷做的碗，上面印有紅色的公雞圖案", correct: "公雞碗", hint: "阿公阿嬤家常見的古早餐具" },
    { name: "彎彎的像月亮，以前農夫用來收割稻米", correct: "鐮刀", hint: "割稻或除草用的利器" },
    { name: "像骰子一樣的方塊，要用手轉動對齊顏色", correct: "魔術方塊", hint: "訓練邏輯的手部益智玩具" },
    { name: "手動轉動手把，就會削出細細長長的鉛筆屑", correct: "削鉛筆機", hint: "以前寫作業前必用的工具" },
    { name: "綠色外殼，中間一個開關，煮飯超好用", correct: "電鍋", hint: "台灣人家裡都有的煮飯神器" },
    { name: "竹子編的圓形大盤子，用來曬乾香菇或菜脯", correct: "竹篩", hint: "曬乾東西的好幫手" },
    { name: "只有一個輪子的手推車，在農田運土或菜", correct: "單輪車", hint: "搬運重物的人力小車" },
    { name: "以前阿嬤用的針線盒，木頭做的有很多小格", correct: "針線盒", hint: "收納縫紉工具的箱子" },
    { name: "用羽毛和橡皮做的，小孩用腳踢不讓它掉地", correct: "毽子", hint: "古代人的足球，用腳踢的" },
    { name: "鐵皮做的青蛙，轉動發條後會在地上跳動", correct: "鐵皮玩具", hint: "不用電池就會動的金屬玩具" }
  ];

  allArtifacts.sort(() => Math.random() - 0.5);
  var selectedQuestions = allArtifacts.slice(0, 6);
  
  var gameData = selectedQuestions.map(function(q) {
    var options = [q.correct];
    while(options.length < 4) {
      var randomItem = allArtifacts[Math.floor(Math.random() * allArtifacts.length)].correct;
      if(!options.includes(randomItem)) options.push(randomItem);
    }
    options.sort(() => Math.random() - 0.5);
    return { name: q.name, correct: q.correct, hint: q.hint, options: options };
  });

  return gameData;
}

// 获取 HTML 元素
const startBtn = document.getElementById("startBtn");
const animationElement = document.getElementById("animation");
const resultDiv = document.getElementById("result");
const treasureImage = document.getElementById("treasure-image");

// 地图上各个区域的位置和范围（假设每个区域的范围为矩形）
const locations = [
  { name: "沙滩", x: 200, y: 50, width: 120, height: 80, tipId: "beach-tip" },
  { name: "树林", x: 100, y: 200, width: 120, height: 80, tipId: "forest-tip" },
  { name: "山洞", x: 50, y: 350, width: 120, height: 80, tipId: "cave-tip" },
  { name: "古城", x: 350, y: 100, width: 120, height: 80, tipId: "ancient-city-tip" },
  { name: "藏宝船", x: 350, y: 300, width: 120, height: 80, tipId: "shipwreck-tip" }
];

let treasureLocation = null;
let playerPosition = { x: 0, y: 0 };  // 初始位置在家中

// 随机生成宝藏位置（宝藏会在某个区域内）
function setTreasureLocation() {
  const randomIndex = Math.floor(Math.random() * locations.length);
  treasureLocation = locations[randomIndex];
  console.log("宝藏位置:", treasureLocation.name); // 可选：查看宝藏位置
}

// 判断小球是否进入了某个区域并更新提示
function checkRegionEntered() {
  let treasureFound = false;

  locations.forEach(location => {
    const tipElement = document.getElementById(location.tipId);

    if (
      playerPosition.x >= location.x &&
      playerPosition.x <= location.x + location.width &&
      playerPosition.y >= location.y &&
      playerPosition.y <= location.y + location.height
    ) {
      // 小球进入了该区域
      tipElement.style.left = `${playerPosition.x}px`;
      tipElement.style.top = `${playerPosition.y - 30}px`;  // 提示在小球上方显示
      tipElement.style.display = 'block';  // 显示提示信息

      // 如果小球进入宝藏区域
      if (treasureLocation && treasureLocation.name === location.name) {
        treasureFound = true;
      }
    } else {
      // 小球没有进入该区域
      tipElement.style.display = 'none';  // 隐藏提示信息
    }
  });

  // 检查宝藏是否被找到
  if (treasureFound) {
    resultDiv.textContent = `恭喜！你找到了宝藏！(${treasureLocation.name})`;
    treasureImage.style.display = 'block';  // 显示宝藏图片
  }
}

// 更新小球位置
function updatePlayerPosition() {
  animationElement.style.left = `${playerPosition.x}px`;
  animationElement.style.top = `${playerPosition.y}px`;
}

// 监听键盘事件控制小球移动
document.addEventListener("keydown", function(event) {
  const moveAmount = 10;

  switch (event.key.toLowerCase()) {  // 使用 toLowerCase 来处理大小写问题
    case "w":  // W键向上移动
      playerPosition.y -= moveAmount;
      break;
    case "s":  // S键向下移动
      playerPosition.y += moveAmount;
      break;
    case "a":  // A键向左移动
      playerPosition.x -= moveAmount;
      break;
    case "d":  // D键向右移动
      playerPosition.x += moveAmount;
      break;
    default:
      break;
  }

  updatePlayerPosition();
  checkRegionEntered();  // 检查小球是否进入了某个区域
});

// 点击开始按钮时启动游戏
startBtn.addEventListener("click", function() {
  resultDiv.textContent = '';  // 清除之前的结果信息
  treasureImage.style.display = 'none';  // 隐藏宝藏图片

  setTreasureLocation();  // 设置随机宝藏位置
  playerPosition = { x: 0, y: 0 };  // 重置玩家位置到家
  updatePlayerPosition();  // 更新小球初始位置

  // 隐藏所有区域的提示信息
  locations.forEach(location => {
    const tipElement = document.getElementById(location.tipId);
    tipElement.style.display = 'none';
  });

  checkRegionEntered();  // 检查初始位置
  resultDiv.textContent = "游戏开始！寻找宝藏！";  // 显示开始信息
});

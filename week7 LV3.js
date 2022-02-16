let data;
axios.get("https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json").then(function (response) {
    data=response.data.data
    render()
    donut()
})
//初始設定
const list = document.querySelector(".ticketCard-area")
const searchText = document.querySelector("#searchResult-text")
function render(area) {
  let str = ""
  let num = 0
  const newData = data.filter(function (item) {
    if(area==item.area){
      return item
    }
    else if(!area){
      return item
    }
  })
  newData.forEach(function (item) {
    str+=`<li class="ticketCard">
    <div class="ticketCard-img">
      <a href="#">
        <img src="${item.imgUrl}" alt="">
      </a>
      <div class="ticketCard-region">${item.area}</div>
      <div class="ticketCard-rank">${item.rate}</div>
    </div>
    <div class="ticketCard-content">
      <div>
        <h3>
          <a href="#" class="ticketCard-name">${item.name}</a>
        </h3>
        <p class="ticketCard-description">
        ${item.description}
        </p>
      </div>
      <div class="ticketCard-info">
        <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
        </p>
        <p class="ticketCard-price">
          TWD <span id="ticketCard-price">$${item.price}</span>
        </p>
      </div>
    </div>
  </li>`
  num++
  })
  // console.log(newData);
  list.innerHTML = str
  searchText.textContent = `本次搜尋共 ${num} 筆資料`
}
//新增功能
  const addBtn = document.querySelector(".addTicket-btn")

function addCard() {
  const ticketName=document.querySelector("#ticketName")
  const ticketImgUrl=document.querySelector("#ticketImgUrl")
  const ticketRegion=document.querySelector("#ticketRegion")
  const ticketPrice=document.querySelector("#ticketPrice")
  const ticketNum=document.querySelector("#ticketNum")
  const ticketRate=document.querySelector("#ticketRate")
  const ticketDescription=document.querySelector("#ticketDescription")
  
  const ticketNameMessage=document.querySelector("#ticketName-message")
  const ticketImgUrlMessage=document.querySelector("#ticketImgUrl-message")
  const ticketRegionMessage=document.querySelector("#ticketRegion-message")
  const ticketPriceMessage=document.querySelector("#ticketPrice-message")
  const ticketNumMessage=document.querySelector("#ticketNum-message")
  const ticketRateMessage=document.querySelector("#ticketRate-message")
  const ticketDescriptionMessage=document.querySelector("#ticketDescription-message")
  const regionSearch=document.querySelector(".regionSearch")
  let warn =`<i class="fas fa-exclamation-circle"></i><span>必填!</span>`
  let obj = {};
  obj.name = ticketName.value
  obj.imgUrl = ticketImgUrl.value
  obj.area = ticketRegion.value
  obj.description = ticketDescription.value
  obj.group = ticketNum.value
  obj.price = ticketPrice.value
  obj.rate = ticketRate.value
  function resetWarn() {
    ticketNameMessage.innerHTML =""
    ticketImgUrlMessage.innerHTML =""
    ticketRegionMessage.innerHTML =""
    ticketPriceMessage.innerHTML =""
    ticketNumMessage.innerHTML =""
    ticketRateMessage.innerHTML =""
    ticketDescriptionMessage.innerHTML =""
    regionSearch.value=""
  }
  if(obj.name===""){
    resetWarn()
    ticketNameMessage.innerHTML =warn;
    return}
  if(obj.imgUrl===""){
    resetWarn()
    ticketImgUrlMessage.innerHTML =warn;
    return
  }
  if(obj.area===""){
    resetWarn()
    ticketRegionMessage.innerHTML =warn;
    return
  }
  if(obj.price===""){
    resetWarn()
    ticketPriceMessage.innerHTML =warn;
    return
  }
  if(obj.group===""){
    resetWarn()
    ticketNumMessage.innerHTML =warn;
    return
  }
  if(obj.rate===""||obj.rate==0){
    resetWarn()
    ticketRateMessage.innerHTML =warn;
    return
  }
  if(obj.description===""){
    resetWarn()
    ticketDescriptionMessage.innerHTML =warn;
    return
  }
  obj.group = Number(ticketNum.value)
  obj.price = Number(ticketPrice.value)
  obj.rate = Number(ticketRate.value)
  if(obj.rate>10){
    obj.rate=10
  }
  else if(obj.rate<1){
    obj.rate=1
  }
  //新增資料
  data.unshift(obj)
  //清空 from 資料
  resetWarn()
  const from = document.querySelector(".addTicket-form")
  from.reset()
  //重新渲染
  donut()
  render()
}
addBtn.addEventListener("click",addCard)
//篩選功能
const areaSelect = document.querySelector(".regionSearch")

areaSelect.addEventListener("change",function () {
  render(areaSelect.value)
})
//甜甜圈圖表
function donut() {
  let totalObj ={}//{高雄: 2, 台北: 1, 台中: 2}
  data.forEach(function (obj) {
      if(totalObj[obj.area]==undefined){
          totalObj[obj.area] = 1;
        }else{
           totalObj[obj.area] +=1;
        }
  })
  // console.log(totalObj);
  let newData =[]
  let area = Object.keys(totalObj)
  //area = ["高雄","台北","台中"]
  area.forEach(function (item) {
      let ary = []
      ary.push(item)
      ary.push(totalObj[item])
      newData.push(ary)
  })
  // console.log(area);
  // console.log(newData);
  const chart = c3.generate({
      bindto: ".chart",
      data: {
        columns: newData,
        type : 'donut',
      },
      donut: {
        title: "套票地區比重",
        width: 12,
        label: {
          show: false,
        },
      }
      });
      chart.resize({
        height: 220,
        width: 220
      });
}
var fbox;
var savedBoxes = [];
var box_IdsCurent = 0;
const reader = new FileReader();
var file_text;
var F2;
reader.onload = event => file_text = event.target.result;


function ex_boxes(numberboxes){
  this.mainBox = document.getElementById("mainContainer");
  for(i=0;i<numberboxes;i++){
    this.element = document.createElement("div");
    this.element.className = "factBox";
    this.mainBox.appendChild(this.element);
  }
}

function createBox(titleText, mainText, Img){
  this.MainBox = document.createElement("div");
  this.MainBox.className = "factBox";
  this.MainBox.id = "C" + box_IdsCurent;


  this.TextElementTitle = document.createElement("h2");
  this.TextNodeTitle = document.createTextNode(titleText);
  this.TextElementTitle.className = "titleText";
  this.TextElementTitle.value = titleText;
  this.TextElementTitle.id = this.MainBox.id + "T";
  this.TextElementTitle.appendChild(this.TextNodeTitle);
  
  this.TextElementMain = document.createElement("p");
  this.TextNodeMain = document.createTextNode(mainText);
  this.TextElementMain.className = "mainText";
  this.TextElementMain.id = this.MainBox.id + "M";
  this.TextElementMain.appendChild(this.TextNodeMain);
  
  this.ButtonElementSave = document.createElement("button");
  this.ButtonElementSave.innerHTML = "Save";
  this.ButtonElementSave.setAttribute("onclick", "saveBox("+box_IdsCurent+");");
  this.ButtonElementSave.className = "saveButton";
  
  this.ButtonElementRemove = document.createElement("button");
  this.ButtonElementRemove.innerHTML = "Remove";
  this.ButtonElementRemove.setAttribute("onclick", "removeBox("+box_IdsCurent+");");
  this.ButtonElementRemove.className = "removeButton";

  if(Img !== ""){
    this.ImgElement = document.createElement("Img");
    this.ImgElement.src = Img;
    this.ImgElement.className = "imgElement";
    this.ImgElement.id = this.MainBox.id + "I";
    
    this.MainBox.appendChild(this.ImgElement);
  }

  this.MainBox.appendChild(this.TextElementTitle);
  this.MainBox.appendChild(this.TextElementMain);
  this.MainBox.appendChild(this.ButtonElementSave);
  this.MainBox.appendChild(this.ButtonElementRemove);

  
  fBox = this.MainBox;
  return this.MainBox;
}

function makeFBox(){
  box_IdsCurent++;
  this.MainContainer = document.getElementById("mainContainer");
  
  this.content = boxInput();

  
  this.MainContainer.appendChild(createBox(this.content.Title, this.content.Main, this.content.Img));
  
  
}

function boxInput(){
  this.fForm = document.getElementById("fBoxForm");
  this.Title = this.fForm.elements[0].value;
  this.Main = this.fForm.elements[1].value;
  if(this.fForm.elements[2].value !== ""){
    this.Img = this.fForm.elements[2].value;
  }
  else{
    this.Img = "";
  }
  this.content = {
    Title: this.Title,
    Main: this.Main,
    Img: this.Img
  };
  
  return this.content;
}

function store(vari){
  localStorage.setItem('storeObj', JSON.stringify(vari));
}

function retrive(){
  var getObject = JSON.parse(localStorage.getItem('storeObj'));
  return getObject;
}

function saveBox(IdNumb){
  if(retrive() !== null){
  savedBoxes = retrive();
  }

  this.Id = "C" + IdNumb;
  this.box = document.getElementById(this.Id);

  this.text = {};
  this.text.Title = document.getElementById(this.Id + "T").innerHTML;
  this.text.Main = document.getElementById(this.Id + "M").innerHTML;
  
  if(document.getElementById(this.Id + "I")){
      this.text.Img = document.getElementById(this.Id +"I").src;
  }
  else{
      this.text.Img = null;
  }


  savedBoxes.push(this.text);
  store(savedBoxes);


  //console.log(this.box.elements[0].value);
  //this.element.Title = this.box.elements[1].innerHTML;
  //console.log(this.element.Title);
}

function load(idnumb){
  if(retrive() !== null){
    box_IdsCurent++;
    this.MainBox = document.getElementById("mainContainer");

    this.contentList = retrive();
    this.content = this.contentList[idnumb];
    if(this.content.Img === null){
      this.MainBox.appendChild(createBox(this.content.Title, this.content.Main, ""));
    }
    else{
      this.MainBox.appendChild(createBox(this.content.Title, this.content.Main, this.content.Img));
    }
  }
}



function reloadSaves(){
  clearSelect();
  this.elements = retrive();
  this.elements.forEach(reloadSavesFE);
}

function reloadSavesFE(value){
  this.select = document.getElementById("loadFormSelect");
  this.Title = value.Title;
  
  this.elementNode = document.createElement("option");
  this.elementNode.innerText = this.Title;
  this.elementNode.value = this.Title;
  
  this.select.appendChild(this.elementNode);
  
}

function clearSelect(){
  var myNode = document.getElementById("loadFormSelect");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}


function startLoad(){
  load(getLoadNumb());
}

function getLoadNumb(){
  this.elements = retrive();
  this.TitleList = getTitleList();
  this.Selected = findSelected();
  
  for(i=0;i<this.elements.length;i++){
    if(this.TitleList[i] == this.Selected){
      this.numb = i;
    }
  }
  return this.numb;
}

function getTitleList(){
  this.elements = retrive();
  this.TitleList = [];
  
  for(i=0;i<this.elements.length;i++){
    this.TitleList.push(this.elements[i].Title);
  }
  return this.TitleList;
}

function findSelected(){
  this.Form = document.getElementById("loadForm");
  this.leng = retrive().length;
  this.TitleList = getTitleList();
  
  for(i=0;i<this.leng;i++){
    if(this.Form.elements[0].value == this.TitleList[i]){
      this.Found = this.TitleList[i];
    }
  }
  return this.Found;
}


function removeSave(){
  this.Selected = getLoadNumb();
  this.elements = retrive();
  this.elements.splice(this.Selected);
  store(this.elements);
  reloadSaves();
}


function removeBox(id){
  this.boxRemove = document.getElementById("C" + id);
  this.MainBox = document.getElementById("mainContainer");
  this.MainBox.removeChild(this.boxRemove);
}




function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function readFile(file){
  reader.readAsText(file);
  this.result = reader.result;
  return this.result;
}

function getFile(){
  this.fileRaw = document.getElementById("idFile");
  this.file = this.fileRaw.files[0];
  return this.file;
}

function download_selected(){
  this.selected_box = getLoadNumb();
  this.fulldata = retrive();
  this.data = this.fulldata[this.selected_box];
  this.dataReady = JSON.stringify(this.data);
  
  download(this.dataReady, this.data.Title, "txt");
}

function load_file(){
  this.file.inside = file_text;
  this.file.object = JSON.parse(this.file.inside);
  this.storee = retrive();
  if(this.storee == null){
    this.storee = [];
  }
  F2 = this.storee;
  this.storee.push(this.file.object);
  store(this.storee);
}


function first_load(){
  if(retrive() !== ""){
    reloadSaves();
  }
}


function asideCreateBoxToggle(){
    this.box = document.getElementById("asideCreateBox");
    
    if (this.box.classList.contains("open"))
        this.box.classList.remove("open");
    else
        this.box.classList.add("open");
}

function asideLoadBoxToggle(){
    this.box = document.getElementById("asideLoadBox");
    
    if (this.box.classList.contains("open"))
        this.box.classList.remove("open");
        //this.box.innerHTML = "<";
    else
        this.box.classList.add("open");
        //this.box.innerHTML = ">";
}
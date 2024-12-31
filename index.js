import { crePassTemplate } from "./longFunctions.js";
import { see_username } from "./longFunctions.js";
import { see_password } from "./longFunctions.js";
import { seeSaveEdit } from "./longFunctions.js";
const searchIcon = document.querySelector(".searchIcon");
const searchBox = document.querySelector(".searchBox");
const appName = document.querySelector(".appName");
const key = document.querySelector(".key");
const forSearch = document.getElementById("forSearch");
const searchInput = document.querySelector(".searchInput");
export const creatingTitle = document.querySelector('.creatingTitle')
const threeLines = document.querySelector(".threeLines");
const aside = document.querySelector(".aside");
const forAside = document.getElementById("forAside");
const forPass = document.querySelector(".forPass");
export const forCheckup = document.querySelector(".forCheckup");
const forSetting = document.querySelector(".forSetting");
const passwordSection = document.querySelector('.passwordSection')
const checkUpSection = document.querySelector('.checkUpSection')
const settingSection = document.querySelector('.settingSection')
export const site = document.querySelector('.site');
const forCreatePassword = document.getElementById('forCreatePassword')
const addPass = document.querySelector('.addPass');
export const createPassword = document.querySelector('.createPassword')
const createCancel = document.querySelector('.createCancel')
export const createSave = document.querySelector('#createSave');
export const allPasswordParent = document.querySelector('.allPasswordParent');
export const seeForPasswordParent = document.querySelector('.seeForPasswordParent');
const seeBack = document.querySelector('.seeBack')
const seeSiteNameHere = document.querySelector('.seeSiteNameHere');
const seeHidePassword = document.querySelector('.seeHidePassword');
const settingState = document.getElementById('settingState')
const checkupState = document.getElementById('checkupState')
const passwordState = document.getElementById('passwordState')
export const siteInput = document.querySelector('.siteInput');
export const userInput = document.querySelector('.userInput');
export const passwordInput = document.querySelector('.passwordInput');
export const savedNote = document.querySelector('#savingNote')
const copy_username = document.querySelector('.copy_username')
const copy_password = document.querySelector('.copy_password')
searchIcon.addEventListener("click", () => {
  if (forSearch.checked) {
    searchIcon.textContent = "✖";
    searchInput.style.display = "block";
    searchInput.style.width = "96%";
    searchInput.style.marginLeft = ".5rem";
    searchInput.style.marginRight = ".5rem";
    appName.style.display = "none";
    key.style.display = "none";
  } else {
    appName.style.display = "block";
    searchInput.style.display = "none";
    searchIcon.textContent = "🔍";
    searchInput.style.width = "40rem";
    searchInput.style.marginLeft = "6.5rem";
    searchInput.style.marginRight = "0";
    key.style.display = "block";
  }
});
threeLines.addEventListener("click", () =>
  forAside.checked
    ? (aside.style.display = "block")
    : (aside.style.display = "none")
);
const switchBetweenSection = (selector, selector1,selector2, block, none1, none2, bgcolor,bgcolor1,bgcolor3) => {
    selector.addEventListener('click', () => {
      none1.style.display = 'none'
      selector1.style.backgroundColor = '#1f2937'
      none2.style.display = 'none'
      selector2.style.backgroundColor = '#1f2937'
      block.style.display = 'block'
      selector.style.backgroundColor = `${bgcolor}`
    })
}
switchBetweenSection(forCheckup,forPass,forSetting,checkUpSection,passwordSection,settingSection,'cornFlowerBlue','white','white')
switchBetweenSection(forSetting,forPass,forCheckup,settingSection,passwordSection,checkUpSection,'cornFlowerBlue','white','white')
switchBetweenSection(forPass,forCheckup,forSetting,passwordSection,checkUpSection,settingSection,'cornFlowerBlue','white','white')
addPass.addEventListener('click', () => forCreatePassword.checked ? createPassword.style.display = 'block': createPassword.style.display = 'none' )
searchInput.addEventListener('input', () => {
  let trimed = searchInput.value.trim();
  if(trimed.length !== 0){
    searchInput.classList.add('colorChanged')
  }else{
    searchInput.classList.remove('colorChanged')
  }
})
createCancel.addEventListener('click', () => {
  createPassword.style.display = 'none'
  seeSaveEdit.style.display = 'none'
  createSave.style.display = 'block'
  forCreatePassword.checked = true;
  siteInput.value = ''
  userInput.value = ''
  passwordInput.value =''
  savedNote.value = ''
  siteInput.style.borderBottom = '2px solid cornFlowerBlue'
  siteInput.removeAttribute('readonly')
  site.textContent = 'Site *'

})
function saveCurrentState(val, value){
  if(val.checked){
    return sessionStorage.setItem("tabs_State", value)
  }
}
forSetting.addEventListener('click', () => {
  sessionStorage.removeItem('tabs_State')
  saveCurrentState(settingState, 'Setting')
  setCurrentState()
})
forCheckup.addEventListener('click', () => {
  sessionStorage.removeItem('tabs_State')
  saveCurrentState(checkupState, 'Checkup');
  setCurrentState()
})
forPass.addEventListener('click', () => {
  sessionStorage.removeItem('tabs_State');
  saveCurrentState(passwordState, 'Password')
  setCurrentState()
})
function getCurrentStates(){
    return sessionStorage.getItem('tabs_State');
}
function setCurrentState(){
  const states = getCurrentStates();
  if(states === 'Setting'){
    forSetting.click();
  }
  if(states === "Password"){
    forPass.click()
  }
  if(states === 'Checkup'){
    forCheckup.click()
  }
}
setCurrentState()
export const makeSureThought = document.querySelector('.makeSureThought')
const enableBtn = (val) => {
  val.addEventListener('input', () => {
    let trimw = val.value.trim();
    if(trimw.length !== 0){
      createSave.style.opacity = '1';
      createSave.classList.add('saveHover')
    }else{
      createSave.classList.remove('saveHover')
      createSave.style.opacity = '0.5';
    }
  })
}
enableBtn(siteInput);enableBtn(userInput);enableBtn(passwordInput);enableBtn(savedNote)
export function changeBG(elem, text, bg){
  elem.style.marginTop = '1rem'
  elem.style.borderRadius = '5px'
  elem.style.color = '#FFFFE0'
  elem.style.fontSize = '1.5rem'
  elem.style.padding = '.5rem'
  elem.style.textAlign = 'center'
  elem.style.backgroundColor = `#${bg}`
  elem.textContent = `${text}`;

}
function validweb() {
  siteInput.addEventListener('input', () => {
    const trimed = siteInput.value.trim();
    if(!trimed.includes(".")){
      changeBG(makeSureThought, 'do you mean .in', '8B0000')
      siteInput.style.borderColor = 'red'
    }else{
        changeBG(makeSureThought, " ", '374151')    
      siteInput.style.borderColor = 'cornFlowerBlue'
    }
  })
}
validweb()
changeBG(makeSureThought, " ", '374151')    
export const hideAddForm = (tr) => {
    createPassword.style.display = 'none'
    siteInput.value = ""
    userInput.value = ""
    passwordInput.value = ""
    savedNote.value = ''
    siteInput.removeAttribute('readonly')
    siteInput.style.borderBottom = '2px solid cornFlowerBlue'    
    site.textContent = 'Site *'
    changeBG(makeSureThought, " ", '374151')
    forCreatePassword.checked === tr;
  }
createSave.addEventListener('click', async () => {
  const site_name = siteInput.value.trim();
  const user_name = userInput.value.trim();
  const password = passwordInput.value.trim();
  const saved_note = savedNote.value.trim();

  if(user_name.length !== 0 && password.length !== 0 && site_name.length !==0 && site_name.includes('.')){
    allPasswordParent.textContent = ''
    fetchUsers()
    changeBG(makeSureThought, "Success", '006400')
    hideAddForm(true)    
    const modify = site_name.split(" ").join("%").toLowerCase();
    const website = `https://${modify}`;
    
    const response = await fetch('./api/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({website, user_name , password, saved_note})
    })
  }else{
    changeBG(makeSureThought, 'do you filled * ?', '8B0000')
  }

})
async function fetchUsers(){
  try {
    const response = await fetch('./api/users')
    const result = await response.json()
    const data = await result;

    for(let keys of data){
      crePassTemplate(keys.website, keys._id)

    }
  } catch (error) {
      console.log('something went wrong', error);    
  }
}
fetchUsers()
const copyFunction = (val, value) => val.addEventListener('click', () => navigator.clipboard.writeText(value.textContent));
copyFunction(copy_username, see_username);
copyFunction(copy_password, see_password);



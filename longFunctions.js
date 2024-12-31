import { allPasswordParent, changeBG, createPassword, createSave, hideAddForm, makeSureThought, passwordInput, savedNote, siteInput, userInput } from "./index.js";
import { seeForPasswordParent } from "./index.js";
import { site } from "./index.js";
const addPass = document.querySelector('.addPass')
const seeHidePassword = document.querySelector('.seeHidePassword');
const goBack = document.querySelector('.goBack');
export const see_username = document.querySelector('.see_username')
const see_Href = document.getElementById("siteHref")
export const see_password = document.querySelector('.see_password')
const see_note = document.querySelector('.see_note');
const seeDelete = document.querySelector('.seeDelete')
const handleMessage = document.querySelector('.handleMessage');
const seeEdit = document.querySelector('.seeEdit')
export const seeSaveEdit = document.querySelector('.seeSaveEdit')
const searchInput = document.querySelector('.searchInput')
export function crePassTemplate(val, obj_id){
    const div1 = document.createElement('div')
    div1.style.padding = '.2rem'
    div1.style.borderTop = 'hidden'
    div1.style.borderRight = 'hidden'
    div1.style.borderLeft = 'hidden'
    div1.style.borderBottom = '1px solid #374151'

    div1.classList.add('passColor')
    const div2 = document.createElement('div');
    div2.classList.add('passwordTemplate');
    div1.append(div2);
    const div3 = document.createElement('div');
    div3.classList.add('siteNameAndIcon');
    div2.append(div3);
    const div4 = document.createElement('div');
    div4.classList.add('siteIcon');
    div4.textContent = '🏀'
    div3.append(div4);
    const div5 = document.createElement('div');
    div5.classList.add('siteName');
    div5.textContent = val;
    div4.after(div5);
    const div6 = document.createElement('div');
    div6.classList.add('rightSymbol');

    div6.textContent = '▶'

    div3.after(div6);
    
    allPasswordParent.append(div1);
    div1.addEventListener('click', async (e) => {
        try {
           const fetchData = await fetch('./api/users');
             const response = await fetchData.json();
             const matchedResponse = response.filter(val => val._id === obj_id)
              updateInformation(matchedResponse[0].website, matchedResponse[0].user_name, matchedResponse[0].password, matchedResponse[0].saved_note)
              HidenSeek(div1);
              delFunc(obj_id, div1)
              handlePatch(obj_id, matchedResponse[0].website, matchedResponse[0].user_name, matchedResponse[0].password, matchedResponse[0].saved_note)

        } catch (error) {
          handleMultipleErrorsAndMessage('please try again', '8B0000')
        }
    })
    
}
function HidenSeek(elem){
    if(elem.style.display = 'block'){
        goBack.style.display = 'block'
        seeHidePassword.style.display = 'none'
        addPass.style.display = 'none'
        allPasswordParent.style.display = 'none'
        seeForPasswordParent.style.display = 'block'
    }
}
function getBack(elem){
    if(elem.style.display = 'block'){
        goBack.style.display = 'none'
        seeHidePassword.style.display = 'block'
        addPass.style.display = 'block'
        allPasswordParent.style.display = 'block'
        seeForPasswordParent.style.display = 'none'
    }
}
goBack.addEventListener('click', () => getBack(goBack));
async function deleteUser(objectId, getMessage) {
    try {
      const response = await fetch(`./api/users/${objectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const message = await response.json();
      getMessage.textContent = message.message
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
    }
}
function delFunc(val, value){
  seeDelete.addEventListener('click', async () => {
    await deleteUser(val, handleMessage);
    value.remove()
    switchElem()
  })
}
function switchElem(){
  seeForPasswordParent.style.display = 'none'
  seeHidePassword.style.display = 'block'
  goBack.style.display ='none'
  addPass.style.display = 'block'
  allPasswordParent.style.display = 'block'
  handleMessage.style.display = 'block'
  setTimeout(() => {
    handleMessage.style.display = 'none'
  }, 1000)
}
function handleMultipleErrorsAndMessage(message, bg){
  handleMessage.textContent = message;
  handleMessage.style.backgroundColor = `#${bg}`;
  handleMessage.style.display = 'block'
  setTimeout(() => {
    handleMessage.style.backgroundColor = '#006400' 
    handleMessage.style.display = 'none'
  }, 1000)
}
async function patch(id, nwebsite, nuser, npass, nnote){
  try {
    const dispatch = await fetch(`./api/users/${id}`, {
      method: "PATCH", 
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        website: nwebsite,
        user_name: nuser,
        password: npass,
        saved_note: nnote
      })
    })
    const response = await dispatch.json()
    console.log(response)
  } catch (error) {
      handleMultipleErrorsAndMessage('user not found', '8B0000');    
      goBack.click()
  }
}
function handlePatch(id, website, username, password, notes) {

  const newEditHandler = () => {
    // put siteInput for readonly
    siteInput.value = website;
    siteInput.setAttribute('readonly', 'readonly')
    siteInput.style.borderBottom = 'none'
    site.textContent = 'Site'
    // end here
    userInput.value = username;
    passwordInput.value = password;
    savedNote.value = notes;

      createPassword.style.display = 'block';
      seeSaveEdit.style.display = 'block';
      createSave.style.display = 'none';
      const newPatchHandler = async () => {
        if(userInput.value === username && passwordInput.value === password && savedNote.value === notes){
          changeBG(makeSureThought, 'Please make changes', '8B0000')
        }else{
          changeBG(makeSureThought, " ", '374151')    
          if(userInput.value.trim().length !== 0 && passwordInput.value.trim().length !== 0&& savedNote.value.trim().length){
            changeBG(makeSureThought, "Success", '006400')
            await patch(id, website, userInput.value, passwordInput.value, savedNote.value);
            updateInformation(website, userInput.value, passwordInput.value, savedNote.value)              
            hideAddForm(false)
          }else{
            changeBG(makeSureThought, 'do you filled * ?', '8B0000')
          }
        }
      }
    
      seeSaveEdit.removeEventListener('click', seeSaveEdit.currentHandler || newPatchHandler)
      seeSaveEdit.addEventListener('click', newPatchHandler);
      seeSaveEdit.currentHandler = newPatchHandler;
    
    };
    seeEdit.removeEventListener('click', seeEdit.currentHandler || newEditHandler);
    seeEdit.addEventListener('click', newEditHandler);
    seeEdit.currentHandler = newEditHandler;
}
function updateInformation(website, username, password, notes){
  see_Href.textContent = website;
  see_username.textContent = username;
  see_password.textContent = password;
  see_note.textContent = notes;
  
}

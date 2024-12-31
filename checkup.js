import { forCheckup } from "./index.js";
const checkAgainBtn = document.querySelector('.checkAgainBtn');
const checkAgain = document.querySelector('.checkAgain');
const checkLoader = document.querySelector('.checkLoader');
const checkChecked = document.querySelector('.checkChecked');
const checkAgo = document.querySelector('.checkAgo');
const reusedCount = document.querySelector('.reusedCount');
const checkUnique = document.querySelector('.checkUnique')
const checkWeak = document.querySelector('.checkWeak')
const checkUniqueSeeHeader = document.querySelector('.checkUniqueSeeHeader');
const checkWeakSeeHeader = document.querySelector('.checkWeakSeeHeader')
const checkUpContainer = document.querySelector('.checkUpContainer')
const uniqueCount = document.querySelector('.uniqueCount')
const thougth3 = document.querySelector('.thougth3');
const checkUniqueTemplate = document.querySelector('.checkUniqueTemplate');
const goBackUnique = document.querySelector('.goBackUnique');
const weakCount = document.querySelector('.weakCount');
const weakCountNearBack = document.querySelector('.weakCountNearBack')
const goBackWeak = document.querySelector('.goBackWeak');
const checkWeakTemplate = document.querySelector('.checkWeakTemplate')
const reusedText = document.querySelector('.reusedText')
const checkUniqueSee = document.querySelector('.checkUniqueSee')
const checkSymbolU = document.querySelector('.checkSymbolU')
const weakCountText = document.querySelector('.weakCountText');
const checkSymbolW = document.querySelector('.checkSymbolW')
const checkWeakSee = document.querySelector('.checkWeakSee');
async function fetchUsersData() {
    const usersData = await fetch('./api/users');
    return usersData.json();
}
function updateCheckStatus(checkedLength) {
    checkChecked.textContent = `Checked passwords for ${checkedLength} sites and apps`;
    checkAgo.textContent = 'Just now';
}
export async function checkFunc() {
    const users = await fetchUsersData();
    checkAgainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        intializing(users.length);
        getTimer().then(async (res) => {
            const fetchAgain = await fetchUsersData();
            afterTimer()
            updateCheckStatus(fetchAgain.length);
            const data = fetchAgain.map(val => val.password).reduce((acc, curr) => {
                if (acc[curr]) {
                    acc[curr] = ++acc[curr]
                } else {
                    acc[curr] = 1;
                }
                return acc;
            }, {})
            const filteredData = Object.entries(data).filter(([key, value]) => value > 1).map(val => val[1]).reduce((acc, curr) => acc + curr, 0)

            if (filteredData > 0) {
                negativeU('unique', filteredData);
                seeForUnique(filteredData);
                const matchData = Object.entries(data).filter(([key, value]) => value > 1).map(val => val[0])
                const dataMatch = await fetchUsersData();
                const matchingData = dataMatch.filter(val => matchData.includes(val.password))
                checkUniqueTemplate.textContent = ''
                for (let keys of matchingData) {
                    checkUniqueTemplateFunc(keys.website, keys.user_name, keys.password, checkUniqueTemplate)
                }
            } else {
                positiveU('unique')
                seeForUnique(filteredData)
            }

            const weakPasswords = fetchAgain.map(val => val.password).filter(val => isWeakPassword(val))
            if (!weakPasswords.length == 0) {
                seeForWeak(weakPasswords.length)
                const weakMatching = fetchAgain.filter(val => weakPasswords.includes(val.password))
                checkWeakTemplate.textContent = ''
                negativeU('weak', weakPasswords.length)
                for (let keys of weakMatching) {
                    checkUniqueTemplateFunc(keys.website, keys.user_name, keys.password, checkWeakTemplate)
                }
            } else {
                positiveU('weak')
                seeForWeak(weakPasswords.length)
            }
        })
    })
}
checkFunc();
function intializing(counts) {
    checkChecked.textContent = `Checking ${counts} passwords`
    checkAgo.textContent = `0 of ${counts}`;
    checkLoader.style.display = 'block';
    checkAgain.style.display = 'block';
    checkAgainBtn.style.display = 'none'
}
function getTimer() {
    let randomTimer = Math.floor(Math.random(3000) * 10000)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Succes')
        }, randomTimer)
    })
}
function afterTimer() {
    checkLoader.style.display = 'none';
    checkAgainBtn.style.display = 'block'
    checkAgain.style.display = 'none';
}
function seeForUnique(counts) {
    checkUnique.addEventListener('click', () => {
        handleUniquePage('a', '')
        uniqueCountFunc(counts)
    })
}
function seeForWeak(counts) {
    checkWeak.addEventListener('click', () => {
        handleUniquePage('', 'b')
        weakCountFunc(counts)
    })
}
function handleUniquePage(a, b) {
    if (a) {
        checkUniqueSeeHeader.style.display = 'block'
        checkUpContainer.style.display = 'none'
    }
    else if (b) {
        checkWeakSeeHeader.style.display = 'block';
        checkUpContainer.style.display = 'none'
    }
}
function uniqueCountFunc(setCount) {
    uniqueCount.textContent = `${setCount} reused passwords`;
    thougth3.textContent = `${setCount} accounts using same passwords`
}
function weakCountFunc(setCount) {
    weakCountNearBack.textContent = `${setCount} weak passwords`
}
function checkUniqueTemplateFunc(webname, Username, Password, appender) {

    const cUniqueParent = document.createElement('div');
    cUniqueParent.classList.add('checkUniqueParent');
    const cUniqueSymbol = document.createElement('div');
    cUniqueParent.classList.add('checkUniquesSymbol');
    cUniqueParent.textContent = '🏀';
    cUniqueParent.append(cUniqueSymbol);
    const cUniqueInfo = document.createElement('div');
    cUniqueInfo.classList.add('checkUniqueInfo')
    const wnameInfo = document.createElement('p');
    wnameInfo.classList.add('webnameInfo');
    wnameInfo.textContent = webname;
    cUniqueSymbol.after(cUniqueInfo);
    cUniqueInfo.append(wnameInfo);
    const unameandinfo = document.createElement('div');
    unameandinfo.classList.add('userAndPassInfo')
    wnameInfo.after(unameandinfo);
    const userinfo = document.createElement('p')
    userinfo.classList.add('userInfo')
    userinfo.textContent = Username
    const passinfo = document.createElement('p')
    passinfo.classList.add('passInfo')
    passinfo.textContent = Password;
    unameandinfo.append(userinfo)
    userinfo.after(passinfo);
    const cBtnU = document.createElement('div');
    cBtnU.classList.add('changeBtnU')
    cBtnU.textContent = 'Change ⇗';
    cUniqueInfo.after(cBtnU);
    appender.append(cUniqueParent)

}
goBackUnique.addEventListener('click', () => {
    checkUniqueSeeHeader.style.display = 'none'
    checkUpContainer.style.display = 'block'
})
goBackWeak.addEventListener('click', () => {
    checkWeakSeeHeader.style.display = 'none'
    checkUpContainer.style.display = 'block'
})
function isWeakPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}:"<>?]).{8,}$/;
    return !regex.test(password);
}
function negativeU(caller, length) {
    if (caller === 'unique') {
        reusedCount.textContent = `${length} reused passwords`
        reusedText.textContent = 'Create unique password'
        checkUniqueSee.textContent = '▶'
        checkSymbolU.textContent = '🔴'
    } else if (caller === 'weak') {
        weakCount.textContent = `${length} weak passwords`
        weakCountText.textContent = 'Create strong passwords';
        checkWeakSee.textContent = '▶'
        checkSymbolW.textContent = '🔴';
    }
}
function positiveU(caller) {
    if (caller === 'unique') {
        checkUniqueTemplate.textContent = ''
        reusedCount.textContent = 'Your passwords are unique'
        reusedText.textContent = 'You are no reusing any passwords'
        checkUniqueSee.textContent = ""
        checkSymbolU.textContent = '🟢'
    } else if (caller === 'weak') {
        checkWeakTemplate.textContent = ''
        weakCount.textContent = 'Your passwords look strong'
        weakCountText.textContent = 'You’re using passwords that look hard to guess'
        checkSymbolW.textContent = ' 🟢'
        checkWeakSee.textContent = ''
    }
}
function autoRunFunc(elem){
    forCheckup.addEventListener('click', () => elem.click())
}
autoRunFunc(checkAgainBtn)
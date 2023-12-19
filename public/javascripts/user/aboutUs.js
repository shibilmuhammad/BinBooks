document.getElementById("whatwedoButton").addEventListener('click', function () {
    let whatwedo = document.getElementById('whatwedo');

    if (whatwedo.style.height === '' || whatwedo.style.height === '0px') {
        whatwedo.style.height = 'fit-content';
        whatwedo.style.visibility = 'visible';
        whatwedo.style.transform = "translateY(0px)";
    } else {
        whatwedo.style.height = '0';
        whatwedo.style.visibility='hidden';
        whatwedo.style.transform = "translateY(-48px)";
    }
});

document.getElementById("ourMissionButton").addEventListener('click', function () {
    let ourMission = document.getElementById('ourMission');

    if (ourMission.style.height === '' || ourMission.style.height === '0px') {
        ourMission.style.height = 'fit-content';
        ourMission.style.visibility = 'visible';
        ourMission.style.transform = "translateY(0px)";
    } else {
        ourMission.style.height = '0';
        ourMission.style.visibility='hidden';
        ourMission.style.transform = "translateY(-48px)";
    }
});

document.getElementById("affordableButton").addEventListener('click', function () {
    let affordable = document.getElementById('affordable');

    if (affordable.style.height === '' || affordable.style.height === '0px') {
        affordable.style.height = 'fit-content';
        affordable.style.visibility = 'visible';
        affordable.style.transform = "translateY(0px)";
    } else {
        affordable.style.height = '0';
        affordable.style.visibility='hidden';
        affordable.style.transform = "translateY(-48px)";
    }
});

document.getElementById("communityButton").addEventListener('click', function () {
    let community = document.getElementById('community');

    if (community.style.height === '' || community.style.height === '0px') {
        community.style.height = 'fit-content';
        community.style.visibility = 'visible';
        community.style.transform = "translateY(0px)";
    } else {
        community.style.height = '0';
        community.style.visibility='hidden';
        community.style.transform = "translateY(-48px)";
    }
});

document.getElementById("journyButton").addEventListener('click', function () {
    let journy = document.getElementById('journy');

    if (journy.style.height === '' || journy.style.height === '0px') {
        journy.style.height = 'fit-content';
        journy.style.visibility = 'visible';
        journy.style.transform = "translateY(0px)";
    } else {
        journy.style.height = '0';
        journy.style.visibility='hidden';
        journy.style.transform = "translateY(-48px)";
    }
});
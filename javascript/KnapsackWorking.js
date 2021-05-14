let knapsack = [], copyKnapsack = [], bag = { Value: 0, Capacity: 0 };
let Format = "Format<br>1. Position<br>2. Weight<br>3. Value<br>5. V/W"
let capacity = 0;
let BagInnerHtml = "<h2>Please add items to the knapsack</h2>", CopiedInnerHtml = "";
let SortedBagInnerHtml = ""
let rotate = 1;

let newItem = document.getElementById("NewItem");
let ShowPopUp = document.getElementById("AddItem");
let NewItemPop = document.getElementById("NewItemPop");
let CapacityPop = document.getElementById("KnapsackCapacity");
let BagItems = document.getElementById("BagItems");
let FormatExample = document.getElementById("FormatExample");
let MessageDisplay = document.getElementById("MessageDisplay");
let FormatExampleText = FormatExample.childNodes[1];


BagItems.innerHTML = BagInnerHtml
FormatExampleText.innerHTML = Format
MessageDisplay.style.display = "none"

function showPopUp() {
    window.scrollTo(0, 0)
    NewItemPop.style.visibility = "visible";
}

function showCapacityPopUp() {
    window.scrollTo(0, 0)
    CapacityPop.style.visibility = "visible";
}

function getBagChildNode(count, weight, value) {
    let div = `<div id="${count}" onclick="deleteNode(${count})">${count}<br>${weight}<br>${value}<br>${(value / weight).toFixed(3)}</div>`
    return div
}

function getDivChildNode(count, weight, value) {
    let div = document.createElement("div")
    div.id = count
    div.onclick = deleteNode(count)
    div.innerHTML = `${count}<br>${weight}<br>${value}<br>${(value / weight).toFixed(3)}`
    return div
}

function deleteNode(count, animate = null) {
    BagItems.removeChild(BagItems.childNodes[count])
    knapsack.splice(count, 1)
    if (knapsack.length == 0 && animate == null) {
        BagItems.innerHTML = "<h2>Please add items to the knapsack</h2>"
    }
    else {
        BagInnerHtml = ""
        for (let length = 0; length < knapsack.length; length++) {
            BagInnerHtml = BagInnerHtml + getBagChildNode(length, knapsack[length].weight, knapsack[length].value)
        }
        BagItems.innerHTML = BagInnerHtml
    }
    console.log(knapsack, BagItems)
}

function getElementOffset(element) {
    let rectangle = element.getBoundingClientRect()
    return {
        top: rectangle.top + window.scrollY,
        left: rectangle.left + window.scrollX
    }
}

console.log(BagItems.childNodes)

newItem.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("Continue").hidden = true;
    let weight = document.getElementById("Weight").value;
    let value = document.getElementById("Value").value;
    console.log(knapsack.length, BagInnerHtml)
    if (knapsack.length == 0) {
        knapsack[0] = {
            weight: parseInt(weight),
            value: parseInt(value),
            ratio: parseFloat((parseInt(value) / parseInt(weight)).toFixed(3))
        };
        BagInnerHtml = ""
    }
    else {
        knapsack.push({
            weight: parseInt(weight),
            value: parseInt(value),
            ratio: parseFloat((parseInt(value) / parseInt(weight)).toFixed(3))
        });
    }
    BagInnerHtml = BagInnerHtml + getBagChildNode(knapsack.length - 1, weight, value)
    BagItems.innerHTML = BagInnerHtml

    console.log(weight, value, knapsack);
    NewItemPop.style.visibility = "hidden";
    console.log(BagItems.childNodes)
})

newItem.addEventListener("reset", (event) => {
    event.preventDefault();
    NewItemPop.style.visibility = "hidden";
    console.log(knapsack);
})

CapacityPop.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("Continue").hidden = true;
    capacity = parseInt(document.getElementById("Capacity").value);
    if (knapsack.length > 0) {
        console.log(capacity);
        CapacityPop.style.visibility = "hidden";
        animateInsertion(knapsack);
    }
    else {
        alert("Please add items to the knapsack");
    }
})

CapacityPop.addEventListener("reset", (event) => {
    event.preventDefault();
    CapacityPop.style.visibility = "hidden";
})

function insertionSort(sortedSack) {
    let j = 0;
    for (let i = 1; i < sortedSack.length; i++) {
        let key = sortedSack[i];
        for (j = i - 1; j >= 0 && sortedSack[j].ratio < key.ratio; j--) {
            sortedSack[j + 1] = sortedSack[j];
        }
        sortedSack[j + 1] = key;
        console.log(key);
    }
    return sortedSack;
}

function rotateDiv() {
    FormatExample.style.transition = "0.25s"
    FormatExampleText.style.transition = "0s"
    FormatExample.style.transform = `rotate(${50 * rotate}deg)`;
    FormatExampleText.style.transform = `rotate(${-50 * rotate}deg)`;
    rotate = rotate + 1;
}

function animateInsertion(cpysack) {
    let count = 1;
    let text;
    console.log("Start", BagItems.childNodes.length);

    MessageDisplay.style.display = "flex"
    MessageDisplay.innerHTML = "Insertion Sort Running"
    FormatExampleText.innerHTML = "";
    FormatExample.style.borderBottom = "none";
    FormatExample.style.borderLeft = "none";

    let timeInterval = setInterval(() => {
        rotateDiv();
        if (count >= cpysack.length) {
            console.log("finished");
            rotate = 0;
            rotateDiv();
            MessageDisplay.style.display = "none"
            MessageDisplay.innerHTML = ""
            FormatExample.style.transition = "0s"
            FormatExampleText.style.transition = "0s"
            FormatExample.style.borderBottom = "solid";
            FormatExample.style.borderLeft = "solid";
            FormatExample.style.borderColor = "green";
            FormatExample.style.backgroundColor = "green";
            FormatExample.style.color = "white";
            FormatExampleText.innerHTML = "Sorting<br>Complete";

            setTimeout(() => {
                FormatExampleText.innerHTML = Format;
                FormatExample.style.backgroundColor = "transparent";
                FormatExample.style.color = "cadetblue";
            }, 1500);

            BagItems.innerHTML = "";
            SortedBagInnerHtml = "";
            let counter = 0;
            console.log(count, cpysack,);

            let newInterval = setInterval(() => {
                if (counter == cpysack.length) {
                    BagItems.lastChild.style.backgroundColor = "transparent";
                    BagItems.lastChild.style.color = "cadetblue";
                    knapsack = cpysack;
                    document.getElementById("Continue").hidden = false;
                    clearInterval(newInterval);
                    BagInnerHtml = SortedBagInnerHtml
                }
                else {
                    SortedBagInnerHtml = SortedBagInnerHtml + getBagChildNode(counter, cpysack[counter].weight, cpysack[counter].value);

                    BagItems.innerHTML = SortedBagInnerHtml;
                    BagItems.lastChild.style.backgroundColor = "green";
                    BagItems.lastChild.style.color = "white";

                    counter = counter + 1;
                }
            }, 1000);

            console.log(BagItems.childNodes)

            clearInterval(timeInterval);
        }
        else {
            rotateDiv();

            let key = cpysack[count];
            let div = BagItems.childNodes[(count < BagItems.childNodes.length) ? count : BagItems.childNodes.length - 1];
            console.log(div, count, BagItems.childNodes);
            rotateDiv();
            div.style.backgroundColor = "green";
            div.style.color = "white";
            let j = count - 1;
            console.log(BagItems.childNodes)
            let innerTimeInterval = setInterval(() => {
                rotateDiv();
                if (j >= 0 && cpysack[j].ratio < key.ratio) {
                    BagItems.childNodes[j].style.backgroundColor = "yellow";
                    BagItems.childNodes[j].style.color = "black";
                    BagItems.insertBefore(BagItems.childNodes[j + 1], BagItems.childNodes[j]);
                    cpysack[j + 1] = cpysack[j];
                    console.log("this", cpysack, BagItems.childNodes[j + 1]);
                    j = j - 1;
                    rotateDiv();
                }
                else {
                    rotateDiv();
                    BagItems.childNodes[j + 1].parentNode.replaceChild(BagItems.childNodes[j + 1], div);
                    cpysack[j + 1] = key;
                    console.log(cpysack);
                    rotateDiv();
                    setTimeout(() => {
                        rotateDiv()
                        for (let i = (count < BagItems.childNodes.length) ? count : (BagItems.childNodes.length - 1); i >= 0; i--) {
                            console.log(i);
                            BagItems.childNodes[i].style.backgroundColor = "transparent";
                            BagItems.childNodes[i].style.color = "cadetblue";
                        }
                    }, 1000)
                    clearInterval(innerTimeInterval);
                }
            }, 30 + 500 / count);
            count = count + 1;
        }
    }, 2000 + 100 * count * count);
}

function ContinueVisualization() {

    document.getElementById("FormatOfBag").style.transitionDuration = "1.5s"
    document.getElementById("previsualizeBtn").style.transitionDuration = "1.5s"

    document.getElementById("FormatOfBag").style.opacity = "0"
    document.getElementById("previsualizeBtn").style.opacity = "0"
    document.getElementById("BagValuesPostVisualization").style.opacity = "0"
    document.getElementById("BagValuesPostVisualization").style.transitionDuration = "1.5s"

    setTimeout(() => {
        document.getElementById("FormatOfBag").style.display = "none"
        document.getElementById("previsualizeBtn").style.display = "none"
        document.getElementById("BagValuesPostVisualization").style.display = "flex"
        setTimeout(() => {
            document.getElementById("BagValuesPostVisualization").style.opacity = "1"
            knapsackVisualization()
        }, 500)
    }, 1500)
}

function knapsackVisualization() {
    let knapsackData = document.getElementById("KnapsackData")
    let divKeeper = document.getElementById("ObjectList")
    let divInnerHtml = ""
    let first = true

    for (let i = 0; i < knapsack.length; i++) {
        copyKnapsack[i] = knapsack[i]
    }
    CopiedInnerHtml = BagInnerHtml

    BagItems.style.transition = "0s"
    knapsackData.style.display = "flex"
    knapsackData.innerHTML = `Weight Remaining: ${capacity}<br>Value: 0`

    bag.Capacity = parseInt(capacity)

    setTimeout(() => {
        knapsackData.innerHTML = ""
        setTimeout(() => {
            document.getElementById("ResetKnapAni").style.display = "flex"
        }, 4000 * knapsack.length)
        for (let i = 1; i <= knapsack.length; i++) {
            setTimeout(() => {
                BagItems.firstChild.style.transition = "0s"
                if (bag.Capacity > 0) {
                    console.log("green", BagItems.firstChild)
                    BagItems.firstChild.style.backgroundColor = "green"
                } else {
                    console.log("red", BagItems.firstChild)
                    BagItems.firstChild.style.borderColor = "red"
                    BagItems.firstChild.style.backgroundColor = "red"
                }
                BagItems.firstChild.style.color = "white"

                setTimeout(() => {
                    if (bag.Capacity > 0) {
                        setTimeout(() => {
                            let coordinates = getImgCoordinates()
                            moveDisappear(coordinates.left, coordinates.top)
                        }, 1000)

                        if (bag.Capacity - knapsack[0].weight >= 0) {
                            bag.Value += knapsack[0].value
                            bag.Capacity -= knapsack[0].weight
                            divInnerHtml = divInnerHtml + squareDiv(knapsack[0].weight, knapsack[0].value)
                            setTimeout(() => {
                                knapsackData.innerHTML = `Remaining Capacity: ${bag.Capacity}<br>Bag Value: ${bag.Value}`
                                divKeeper.innerHTML = divInnerHtml
                                deleteNode(0, true)
                            }, 2000)
                        }
                        else {
                            knapsackData.innerHTML = "Considering Fractional Weight"
                            setTimeout(() => {
                                let fraction = bag.Capacity / knapsack[0].weight
                                knapsackData.innerHTML = "Fraction = " + fraction
                                let weightRequired = bag.Capacity
                                bag.Value += parseFloat((knapsack[0].value * fraction).toFixed(3))
                                divInnerHtml = divInnerHtml + squareDiv(weightRequired, parseFloat((knapsack[0].value * fraction).toFixed(3)))
                                bag.Capacity = 0
                                setTimeout(() => {
                                    deleteNode(0, true)
                                    knapsackData.innerHTML = `Remaining Capacity: ${bag.Capacity}<br>Bag Value: ${bag.Value.toFixed(3)}`
                                    divKeeper.innerHTML = divInnerHtml
                                }, 1000)
                            }, 1000)
                        }
                    }
                    else {
                        BagItems.firstChild.style.transition = "3000ms"
                        BagItems.firstChild.style.transform = "scale(0.2)"
                        BagItems.firstChild.style.opacity = "0"
                        setTimeout(() => {
                            deleteNode(0, true)
                        }, 2000)
                    }
                }, 1000)
            }, 4000 * (i - 1))
        }
    }, 4000)

    knapsackData.innerHTML = `<p style="color: red;">Starting Knapsack Problem</p>`
}

function moveDisappear(x, y) {
    BagItems.firstChild.style.zIndex = "-1"
    BagItems.firstChild.style.transition = "2s"
    console.log("move", BagItems.firstChild)
    BagItems.firstChild.style.transform = `translate(${x}px, ${y}px) scale(0.2)`
    BagItems.firstChild.style.opacity = "0"
}

function squareDiv(weight, value) {
    let div = `<div>Weight: ${weight}<br>Value: ${value}</div>`
    return div
}

function getImgCoordinates() {
    let img = document.getElementById("BagImg")
    let imgRect = img.getBoundingClientRect()
    let objectRect = BagItems.firstChild.getBoundingClientRect()
    let top = (imgRect.top + imgRect.height / 2) - objectRect.bottom
    let left = (imgRect.left + imgRect.width / 2) - (objectRect.left + objectRect.width / 2)
    console.log(top, left)
    return {
        top: top,
        left: left
    }
}

function knapsackResetAnimation() {
    knapsack = copyKnapsack
    console.log(knapsack, copyKnapsack)
    BagInnerHtml = CopiedInnerHtml
    BagItems.innerHTML = BagInnerHtml
    document.getElementById("KnapsackData").innerHTML = ""
    document.getElementById("ResetKnapAni").style.display = "none"
    window.scrollTo(0, 0)
    knapsackVisualization()
}

function resetAll() {
    window.location.href = 'index.html'
}

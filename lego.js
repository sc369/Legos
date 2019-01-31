const legoContainer = document.querySelector("#lego__container")
const createButton = (index) => {
    const button = document.createElement("button")
    button.setAttribute("id", [index])
    button.appendChild(document.createTextNode("Load this item"))
    return button
}

document.querySelector(".save__button").addEventListener("click", event => {
    const creator = document.querySelector("#lego__creator").value
    const creation = document.querySelector("#lego__creation").value
    const shape = document.querySelector("#lego__shape").value
    const color = document.querySelector("#lego__color").value
    // Once you have collected all the values, build your data structure
    const legoToSave = {
        "creator": creator,
        "creation": creation,
        "shape": shape,
        "color": color
    }

    fetch("http://127.0.0.1:8081/legos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(legoToSave)
    })
})

const createLargeHTML = (item) => {
    const itemWrapper = document.createElement("div")
    const legoName = document.createElement("p")
    const nameText = document.createTextNode(`Name: ${item.creation} `)
    const legoShape = document.createElement("p")
    const shapeText = document.createTextNode(`Type: ${item.shape} `)
    const legoCreator = document.createElement("p")
    const creatorText = document.createTextNode(`Creator: ${item.creator}`)
    const legoColor = document.createElement("p")
    const colorText = document.createTextNode(`Color: ${item.color} `)
    legoCreator.appendChild(creatorText)
    legoShape.appendChild(shapeText)
    legoName.appendChild(nameText)
    legoColor.appendChild(colorText)
    itemWrapper.appendChild(legoName)
    itemWrapper.appendChild(legoShape)
    itemWrapper.appendChild(legoColor)
    itemWrapper.appendChild(legoCreator)
    return itemWrapper
}

// const createButtonListener = (item) => {
// legoContainer.addEventListener("click", event => {
//     console.log(item)
// createLargeHTML(item)
// })
// }

const createSmallHTML = (item, index) => {
    const itemWrapper = document.createElement("div")
    const legoName = document.createElement("span")
    const legoText = document.createTextNode(item.creation)
    const button = createButton(index)
    button.addEventListener("click", event => {
        let newId = parseInt(button.id) + 1
        console.log(newId)
        fetch(`http://127.0.0.1:8081/legos/${newId}`)
            .then(result => result.json())
            .then(selectedItem => {
                console.log(selectedItem)
                const largeHTML = createLargeHTML(selectedItem)
                appendItem(largeHTML)
            })


        const thisButton = (document.getElementById(`${button.id}`))
        // createLargeHTML ()
    })
    itemWrapper.appendChild(button)
    legoName.appendChild(legoText)
    itemWrapper.appendChild(legoName)
    return itemWrapper
}

const appendItem = (item) => {
    legoContainer.appendChild(item)
}
//fetch saved list of legos and create a divwrapper for each one with its name and
//associated button, then add them to the DOM. 
document.querySelector(".load__button").addEventListener("click", event => {
    fetch("http://127.0.0.1:8081/legos")
        .then(result => result.json())
        .then(parsedResult => {
            for (let index = 0; index < parsedResult.length; index++) {
                const element = parsedResult[index]
                const smallItem = createSmallHTML(element, index)
                // const largeItem = createLargeHTML(element)
                appendItem(smallItem)
            }
        })
})


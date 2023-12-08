//import "./styles.css";
//import { jsPlumb, jsPlumbInstance } from "./node_modules/@jsplumb/browser-ui/js/jsplumb.browser-ui.es.js";

//import { ready } from "@jsplumb/browser-ui"

function createItem(id, label, top, left) {
    var newItem = document.createElement('div');
    newItem.className = 'diagram-node';
    newItem.id = id;
    newItem.innerHTML = "<strong>" + label + "</strong>";
    newItem.style = "left: " + left + ";top:" + top + ";";
    return newItem;
  }

const defaultItems = [
    {
        id: "item1",
        top: "50px",
        left: "50px",
        label: "item 1"
    },
    {
        id: "item2",
        top: "50px",
        left: "200px",
        label: "item 2"
    },
    {
        id: "item3",
        top: "200px",
        left: "125px",
        label: "item 3"
    }
];

var itemObjs = [];


jsPlumb.ready(() => {
    // Todo 
    const container = document.getElementById("diagram-container");

    const instance = jsPlumb.newInstance(
    {
        container:container
    });

    let myItems = [];
    if (!localStorage.jsPlumbItems) {
        localStorage.jsPlumbItems = JSON.stringify(defaultItems);
        myItems = defaultItems;
    }
    else {
        // TODO: validate the parse
        myItems = JSON.parse(localStorage.jsPlumbItems);
    }

    for (const item of myItems ) {
        var newItem = createItem(item.id, item.label, item.top, item.left);
        itemObjs.push(newItem);

        container.appendChild(newItem);
    }


    
    instance.connect({
        source:itemObjs[0],
        target:itemObjs[1],
        anchors:[
            { type: "Perimeter", options: { shape:"Square" }},
            { type: "Perimeter", options: { shape:"Square" }}
        ]
    });

    const ep1 = instance.addEndpoint(itemObjs[2], {
        endpoint:"Blank",
        anchor:{ type: "Perimeter", options: { shape:"Square" }}
    });

    instance.on(document.getElementById("item1"), "contextmenu", function (e) {
        e.preventDefault();
        var menu = $("<ul class='context-menu'>");
        menu.append("<li>Option 1</li>");
        menu.append("<li>Option 2</li>");
        menu.append("<li>Option 3</li>");
        menu.css({
          "position": "absolute",
          "left": e.pageX + "px",
          "top": e.pageY + "px"
        });
        $("body").append(menu);
      });
    
    /*const node1 = document.getElementById("item1");
    const node2 = document.getElementById("item2");
    const instance = jsPlumb.newInstance(
        {
            container:elem
        });*/

    //const ep1 = instance.addEndpoint(node1, {
        //endpoint:"Dot",
        //anchor:[ "Perimeter", { shape:"Square"}]
    //});

    //const ep2 = instance.addEndpoint(node2, {
        //endpoint:"Dot",
        //anchor:[ "Perimeter", { shape:"Square"}]
    //});

    // anchor:{ type:"Perimeter", options:{ shape:"Circle", anchorCount:150 } }
    //instance.connect({
     //   source:node1,
     //   target:node2,
      //  anchors:[
     //       { type: "Perimeter", options: { shape:"Square" }},
      //      { type: "Perimeter", options: { shape:"Square" }}
        /*//], 
        connector:{
            type:"Bezier", 
            overlays:[
                { type:"Label", options:{label:"Connection 1", location:0.5}}
            ] 
        }*/
    //});


    instance.bind("drag:stop", (p) => {
        var x = 0;
        var storedItems = JSON.parse(localStorage.jsPlumbItems);
        if (p.elements.length == 1) {
            let movedElement = p.elements[0];
            let storedItemIndex = storedItems.findIndex(s => s.id == movedElement.id)
            let domItem = itemObjs.find(i => i.id == movedElement.id)

            if (storedItemIndex > 0 && domItem) {
                //let xDiff = movedElement.pos.x - movedElement.originalPos.x;
                //let yDiff = movedElement.pos.y - movedElement.originalPos.y;
                storedItems[storedItemIndex].top = domItem.style.top;
                storedItems[storedItemIndex].left = domItem.style.left;
            }
            localStorage.jsPlumbItems = JSON.stringify(storedItems);
        }
    });
});

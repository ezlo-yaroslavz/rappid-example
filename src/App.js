import React, {useState, useEffect, useRef} from 'react';
import {dia, ui, shapes, setTheme} from '@clientio/rappid';
import './App.scss';
// import * as  joint from "jointjs";

// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center"
// };

const App = () => {
  const canvas = useRef(null);
  const sidebar = useRef(null);
  const [graph, setGraph] = useState(null);
  const [data, setData] = useState([
    {position: {x: 30, y: 10}, name: "Table lamp"},
    {position: {x: 160, y: 10}, name: "Table lamp 2"},
    {position: {x: 290, y: 10}, name: "Table lamp 3"},
    {position: {x: 30, y: 74}, name: "Table lamp 4"},
    {position: {x: 160, y: 74}, name: "Table lamp 5"},
  ]);
  const [data2, setData2] = useState([
    {position: {x: 30, y: 10}, name: "then lamp"},
    {position: {x: 160, y: 10}, name: "Table lamp 2"},
    {position: {x: 290, y: 10}, name: "Table lol lamp 3"},
    {position: {x: 30, y: 74}, name: "then lamp 4"},
    {position: {x: 160, y: 74}, name: "thwn lamp 5"},
  ]);

  useEffect(() => {
    const graph = new dia.Graph({});
    setGraph(graph)
    setTheme('modern');

    const paper = new dia.Paper({
      model: graph,
      // className: "paper__main",
      frozen: true,
      async: true
    });

    // const scroller = new ui.PaperScroller({
    //   paper,
    //   autoResizePaper: true,
    //   cursor: 'grab'
    // });

    // const CustomElementView = () => {
    //   return (
    //     <g className="rotatable">
    //       <g className="scalable">
    //         <rect/>
    //       </g>
    //       <text/>
    //     </g>
    //   )
    // }
    const stenci2 = new ui.Stencil({
      paper: paper,
      // width: 200,
      // height: 400,
      groupsToggleButtons: true,
      // layout: {
      //   columnWidth: 100,
      //   columns: 3,
      //   rowHeight: 100,
      // },
      groups: {
        if: {label: 'If', index: 1},
        then: {label: 'Then', index: 2, closed: true},
      }
    });

    const stencil = new ui.Stencil({
      paper: paper,
      // width: 200,
      // height: 400,
      groupsToggleButtons: true,
      // layout: {
      //   columnWidth: 100,
      //   columns: 3,
      //   rowHeight: 100,
      // },
      search: function (element, keyword, groupId, stencil) {
        // console.log("element", element)
        // console.log("keyword", keyword)
        // console.log("groupId", groupId)
        // console.log("stencil", stencil)
        console.log("element.get('label')", element.attr(['label', 'text']))
        return element.attr(['label', 'text']).includes(keyword) || groupId.includes(keyword);
      },
      groups: {
        if: {label: 'If', index: 1},
        then: {label: 'Then', index: 2, closed: true},
      }
    });

    // var paper = new joint.dia.Paper({
    //   width: 2000,
    //   height: 2000,
    //   model: graph
    // });
    //
    // var paperScroller = new joint.ui.PaperScroller({
    //   paper: paper
    // });
    //
    // $('#paper-container').append(paperScroller.render().el);

    // const
    // canvas.current.appendChild(scroller.el);

    sidebar.current.appendChild(stencil.el);
    canvas.current.appendChild(paper.el)

    stencil.render();
    paper.render()
    // scroller.render().center();


    const configBlock = (label, labelSidebar, color, switcher, attrs) => {
      const of = "turn of";
      const on = "turn on";

      return {
        size: {width: 100, height: 54},
        attrs: {
          body: {
            rx: 3,
            ry: 3,
            strokeWidth: 1,
            stroke: color,
          },
          label: {
            text: label,
            fontSize: 13,
            refY: 40,
          },
          image: {
            width: 20,
            height: 20,
            refX: "50%",
            refY: 7,
            refX2: -10,
            fill: '#000000',
            stroke: '#000000',
            strokeWidth: 1,
            pointerEvents: 'none',
            xlinkHref: `${process.env.PUBLIC_URL}/assets/menu.png`,
          },
          sidebar: {
            width: 20,
            height: 54,
            stroke: color,
            fill: "white",
            refX: -20,
            strokeWidth: 1,
            resize: true,
            rx: 3,
            ry: 3,
          },
          switcher: {
            width: 10,
            height: 10,
            fill: switcher,
            rx: '50%',
            ry: "50%",
            refX: 85,
            refY: 5,
          },
          sidebarLabel: {
            text: labelSidebar,
            fill: color,
            textAnchor: "middle",
            textVerticalAnchor: "middle",
            // stroke: "black",
            fontSize: 13,
            strokeWidth: 1,
            // refX: 5,
            // refX2: -20,
            width: 20,
            height: 54,
            refY: "50%",
          },
          switcherG: {
            // width: 70,
            // height: 30,
            visibility: 'hidden',
            // refX: 0,
            // refY: 0,
            // fill: 'white',
            // stroke: 'black',
            // strokeWidth: 1,
          },
          switcherMenu: {
            width: 70,
            height: 30,
            refX: 60,
            refY: 45,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 1,
          },
          switcherMenuOf: {
            cursor: 'pointer',
            fill: 'white',
            width: 70,
            height: 15,
            event: 'element:buttonOf:pointerdown',
            refX: 60,
            refY: 60,
          },
          switcherMenuOn: {
            cursor: 'pointer',
            fill: 'white',
            width: 70,
            height: 15,
            event: 'element:buttonOn:pointerdown',
            refX: 60,
            refY: 45,
          },
          switcherOfLabel: {
            pointerEvents: 'none',
            text: of.toUpperCase(),
            fontSize: 11,
            fill: 'black',
            refX: 62,
            refY: 62,
          },

          switcherOnLabel: {
            pointerEvents: 'none',
            text: on.toUpperCase(),
            fontSize: 11,
            fill: 'black',
            refX: 62,
            refY: 47,
          }

        },
        markup: [
          {tagName: "rect", selector: "body", className: "body"},
          {tagName: "text", selector: "label"},
          {tagName: 'image', selector: 'image'},
          {tagName: "rect", selector: "sidebar", },
          {tagName: "text", selector: "sidebarLabel", className: "ff"},
          {tagName: "rect", selector: "switcher"},
          {
            tagName: "g",
            selector: "switcherG",
            children: [
              {tagName: 'rect', selector: 'switcherMenu'},
              {tagName: 'rect', selector: 'switcherMenuOf', groupSelector: "bodySwitcher"},
              {tagName: 'rect', selector: 'switcherMenuOn', groupSelector: "bodySwitcher"},
              {tagName: 'text', selector: 'switcherOfLabel', groupSelector: "labelSwitcher"},
              {tagName: 'text', selector: 'switcherOnLabel', groupSelector: "labelSwitcher"}
            ]
          },
          // {tagName: 'rect', selector: 'switcherMenu'},
          // {tagName: 'rect', selector: 'switcherMenuOf'},
          // {tagName: 'rect', selector: 'switcherMenuOn'},
          // {tagName: 'text', selector: 'switcherOfLabel'},
          // {tagName: 'text', selector: 'switcherOnLabel'}
        ],
      }
    };




    const r = new shapes.standard.Rectangle()
    // const m = matrix(1, 0, 0, 1, 50, 11)

    // console.log(r)
    let g = 50;
    let gd = 11;

    const port = {
      // id: 'abc', // generated if `id` value is not present
      group: 'a',
      args: {}, // extra arguments for the port layout function, see `layout.Port` section
      label: {
        position: {
          name: 'right',
          args: {y: 6} // extra arguments for the label layout function, see `layout.PortLabel` section
        },
        markup: '<text class="label-text" fill="blue"/>'
      },
      attrs: {text: {text: 'port1'}},
      // markup: '<rect width="16" height="16" x="-8" strokegit ="red" fill="gray"/>'
      // markup: '<rect><div>fgfdgfdgdf</div>'
    };

    // const block1 = new shapes.standard.Rectangle({
    //   rotateAngleGrid: 70,
    //   size: {width: 100, height: 54},
    //   position: {x: 60, y:60},
    //   attrs: {
    //     label: {
    //       text: 'ffff'
    //     },
    //     body: {
    //       angle: 90
    //     }
    //   },
    //
    //
    // })

    const whenListBlocks = data.map((item) => {
      let block = new shapes.standard.Rectangle(configBlock(item.name, "if", "red", "green"));
      console.log("block", block)
      block.set('position', item.position);
      // block.set('angle', 90)

      return block
    });

    const whenListBlocks2 = data2.map((item) => {
      let block = new shapes.standard.Rectangle(configBlock(item.name, "then", "blue", "green"));
      block.set('position', item.position);

      return block
    });

    console.log("whenListBlocks", whenListBlocks)


    stencil.load({if: [...whenListBlocks], then: [...whenListBlocks2]})

    // graph.addCell([block1]);


    paper.on('cell:pointerup', (cellView) => {
      const attrs = ["switcherMenu", "switcherMenuOf", "switcherMenuOn", "switcherOfLabel", "switcherOnLabel"]
      // We don't want a Halo for links.
      if (cellView.model instanceof dia.Link) return;
      let model = cellView.model;

      const halo = new ui.Halo({
        cellView: cellView,
        // type: 'pie',
        // type: 'toolbar'
      });

      console.log("cellView", cellView)

      // attrs.map(item => {
      //   console.log(item)
      //   model.removeAttr(item)
      // })


      // halo.removeHandle('clone');
      // halo.on('action:state:open', function(evt) {
      //   console.log("fdsfdsf", evt)
      // })
      // halo.isOpen(() => {
      //   console.log("44")
      // })
      halo.addHandle({name: 'switcher', position: 's', icon: `${process.env.PUBLIC_URL}/assets/menu.png`});
      halo.on('action:switcher:pointerdown', function (evt) {
        evt.stopPropagation();
        // let model = halo.options.cellView.model;
        let gg = {
          width: 70,
          height: 30,
          visibility: 'hidden',
          refX: 60,
          refY: 45,
          fill: 'white',
          stroke: 'black',
          strokeWidth: 1,
        }



        model.removeAttr('switcherG')
        // model.removeAttr('switcherMenuOf')
        // model.attr('switcherMenu', gg)

        // console.log("first", model.removeAttr('switcherMenu'))
        // console.log("first", model.removeAttr('switcherMenuOf'))
        // console.log("first", model.removeAttr('switcherMenuOn'))
        // console.log("first", model.removeAttr('switcherOfLabel'))
        // console.log("first", model.removeAttr('switcherOnLabel'))
        // console.log("first", model.attr('switcherMenu').remove())


        model.attr('switcherG/visibility', 'visible');
        // model.attr('switcherMenuOf/visibility', 'visible');
        // model.attr('switcherMenuOn/visibility', 'visible');
        // model.attr('switcherOfLabel/visibility', 'visible');
        // model.attr('switcherOnLabel/visibility', 'visible');


        // if (model.attr('switcherMenu/visibility') === 'visible') {
        //   model.attr('switcherMenu/visibility', 'hidden');
        //   model.attr('switcherMenuOf/visibility', 'hidden');
        //   model.attr('switcherMenuOn/visibility', 'hidden');
        //   model.attr('switcherOfLabel/visibility', 'hidden');
        //   model.attr('switcherOnLabel/visibility', 'hidden');
        //
        // } else {
        //   model.attr('switcherMenu/visibility', 'visible');
        //   model.attr('switcherMenuOf/visibility', 'visible');
        //   model.attr('switcherMenuOn/visibility', 'visible');
        //   model.attr('switcherOfLabel/visibility', 'visible');
        //   model.attr('switcherOnLabel/visibility', 'visible');
        //   // model.attr('buttonLabel/text', '＿'); // fullwidth underscore
        // }
        halo.remove()

      });

      halo.render();
    });

    graph.on('add', function (cell, collection, opt) {
      // The stencil adds the `stencil` property to the option object with value
      // set to a client id (`cid`) of the stencil view.
      console.log("collection", collection)
      const attrs = ["switcherMenu", "switcherMenuOf", "switcherMenuOn", "switcherOfLabel", "switcherOnLabel"]
      const models = collection.models;

      console.log("models", models)

      // models.map(item => {
      //   console.log("item", item.attributes.markup)
      // })
      // attrs.map(item => {
      //   console.log(item)
      //   model.removeAttr(item)
      // })
      if (opt.stencil) {
        console.log('A cell with id', cell.id, 'was just added to the paper from the stencil.');
      }
    });
    paper.on('element:pointerdown', function(elementView) {

      console.log("elementView", elementView)
      ui.Inspector.create('#inspector', {
        cell: elementView.model,
        inputs: {
          attrs: {
            circle: {
              fill: {
                type: 'color-palette',
                options: [
                  { content: '#FFFFFF' },
                  { content: '#FF0000' },
                  { content: '#00FF00' },
                  { content: '#0000FF' },
                  { content: '#000000' }
                ],
                label: 'Fill color',
                group: 'presentation',
                index: 1
              },
              stroke: {
                type: 'color-palette',
                options: [
                  { content: '#FFFFFF' },
                  { content: '#FF0000' },
                  { content: '#00FF00' },
                  { content: '#0000FF' },
                  { content: '#000000' }
                ],
                label: 'Outline color',
                group: 'presentation',
                index: 2
              },
              'stroke-width': {
                type: 'range',
                min: 0,
                max: 50,
                unit: 'px',
                label: 'Outline thickness',
                group: 'presentation',
                index: 3
              }
            },
            text: {
              text: {
                type: 'textarea',
                label: 'Text',
                group: 'text',
                index: 1
              },
              'font-size': {
                type: 'range',
                min: 5,
                max: 30,
                label: 'Font size',
                group: 'text',
                index: 2
              },
              'font-family': {
                type: 'select',
                options: ['Arial', 'Times New Roman', 'Courier New'],
                label: 'Font family',
                group: 'text',
                index: 3
              }
            }
          }
        },
        groups: {
          presentation: {
            label: 'Presentation',
            index: 1
          },
          text: {
            label: 'Text',
            index: 2
          }
        }
      });
    })

    paper.on('element:buttonOf:pointerdown', function (elementView, evt) {
      // Stop any further actions with the element view e.g. dragging
      evt.stopPropagation();
      // console.log("elementView.model", elementView)
      let model = elementView.model;
      console.log("model", model)

      // console.log("first", model.removeAttr('switcherMenu'))

      model.attr('switcherG/visibility', 'hidden');
      // model.attr('switcherMenuOf/visibility', 'hidden');
      // model.attr('switcherMenuOn/visibility', 'hidden');
      // model.attr('switcherOfLabel/visibility', 'hidden');
      // model.attr('switcherOnLabel/visibility', 'hidden');
      model.attr('switcher/fill', 'red');
      console.log("model2 of", model)

      // if (model.attr('body/visibility') === 'visible') {
      //   model.attr('body/visibility', 'hidden');
      //   model.attr('label/visibility', 'hidden');
      //   model.attr('buttonLabel/text', '＋'); // fullwidth plus
      //
      // } else {
      //   model.attr('body/visibility', 'visible');
      //   model.attr('label/visibility', 'visible');
      //   model.attr('buttonLabel/text', '＿'); // fullwidth underscore
      // }
    });
    paper.on('element:buttonOn:pointerdown', function (elementView, evt) {
      // Stop any further actions with the element view e.g. dragging
      evt.stopPropagation();
      // console.log("elementView.model", elementView)
      let model = elementView.model;
      console.log("model", model)
      // console.log("model",  model.attr('switcherMenuOf').remove())

      console.log("first", model.removeAttr('switcherMenu'))

      model.attr('switcherG/visibility', 'hidden');
      // model.attr('switcherMenuOf/visibility', 'hidden');
      // model.attr('switcherMenuOn/visibility', 'hidden');
      // model.attr('switcherOfLabel/visibility', 'hidden');
      // model.attr('switcherOnLabel/visibility', 'hidden');
      model.attr('switcher/fill', 'green');
      console.log("model2 on", model)

      // if (model.attr('body/visibility') === 'visible') {
      //   model.attr('body/visibility', 'hidden');
      //   model.attr('label/visibility', 'hidden');
      //   model.attr('buttonLabel/text', '＋'); // fullwidth plus
      //
      // } else {
      //   model.attr('body/visibility', 'visible');
      //   model.attr('label/visibility', 'visible');
      //   model.attr('buttonLabel/text', '＿'); // fullwidth underscore
      // }
    });


    paper.unfreeze();
  }, []);


  // componentDidMount() {
  //   var graph = new joint.dia.Graph();
  //
  //   var paper = new joint.dia.Paper({
  //     el: document.getElementById("canvas"),
  //     model: graph,
  //     width: 1920,
  //     height: 800,
  //     gridSize: 1
  //   });
  //
  //   var rect = new joint.shapes.standard.Rectangle();
  //   rect.position(100, 30);
  //   rect.resize(100, 40);
  //   rect.attr({
  //     body: {
  //       fill: "blue"
  //     },
  //     label: {
  //       text: "Hello",
  //       fill: "white"
  //     }
  //   });
  //   rect.addTo(graph);
  //
  //   var rect2 = rect.clone();
  //   rect2.translate(300, 0);
  //   rect2.attr("label/text", "World!");
  //   rect2.addTo(graph);
  //
  //   var link = new joint.shapes.standard.Link();
  //   link.source(rect);
  //   link.target(rect2);
  //   link.addTo(graph);
  // }
  // consturctor() {
  //   this.reference = null;
  // }
  //
  // componentDidMount() {
  //   this.jointExample();
  // }
  //
  // jointExample = () => {
  //   var CustomElement = joint.dia.Element.define(
  //     "examples.CustomElement",
  //     {
  //       attrs: {
  //         body: {
  //           refWidth: "100%",
  //           refHeight: "100%",
  //           strokeWidth: 2,
  //           stroke: "black",
  //           fill: "white"
  //         },
  //         label: {
  //           textVerticalAnchor: "middle",
  //           textAnchor: "middle",
  //           refX: "50%",
  //           refY: "50%",
  //           fontSize: 14,
  //           fill: "black"
  //         },
  //         button: {
  //           cursor: "pointer",
  //           refX: "0",
  //           refX2: -20,
  //           refY2: -10,
  //           refY: "50%",
  //           d: "M 0 0 H 20 L 10 10 L 0 0"
  //         }
  //       }
  //     },
  //     {
  //       markup: [
  //         {
  //           tagName: "rect",
  //           selector: "body"
  //         },
  //         {
  //           tagName: "text",
  //           selector: "label"
  //         },
  //         {
  //           tagName: "path",
  //           selector: "button"
  //         },
  //         {
  //           tagName: "text",
  //           selector: "buttonLabel"
  //         }
  //       ]
  //     }
  //   );
  //
  //   var graph = new joint.dia.Graph();
  //
  //   var paper = new joint.dia.Paper({
  //     el: this.reference,
  //     model: graph,
  //     width: 600,
  //     height: 100,
  //     gridSize: 1
  //   });
  //
  //   var element = new CustomElement();
  //   element.position(250, 30);
  //   element.resize(100, 40);
  //   element.attr({
  //     label: {
  //       pointerEvents: "none",
  //       visibility: "visible",
  //       text: "Element"
  //     },
  //     body: {
  //       cursor: "default",
  //       visibility: "visible"
  //     },
  //     button: {
  //       event: "element:button:pointerdown",
  //       fill: "orange",
  //       stroke: "black",
  //       strokeWidth: 2
  //     }
  //   });
  //   element.addTo(graph);
  //
  //   paper.on("element:button:pointerdown", function (elementView, evt) {
  //     evt.stopPropagation(); // stop any further actions with the element view (e.g. dragging)
  //
  //     var model = elementView.model;
  //
  //     if (model.attr("body/visibility") === "visible") {
  //       model.attr("body/visibility", "hidden");
  //       model.attr("label/visibility", "hidden");
  //     } else {
  //       model.attr("body/visibility", "visible");
  //       model.attr("label/visibility", "visible");
  //     }
  //   });
  // };

  const tee = () => {
    // console.log("graph", graph)
    setData([2])
  };

  // const customBlock = () => {
  //   const blockWhen = dia.Element.define('customBlock',
  //     {
  //       attrs: {
  //         body: {
  //           refWidth: "100%",
  //           refHeight: "100%",
  //           strokeWidth: 2,
  //           stroke: "black",
  //           fill: "white"
  //         },
  //         label: {
  //           textVerticalAnchor: "middle",
  //           textAnchor: "middle",
  //           refX: "50%",
  //           refY: "50%",
  //           fontSize: 14,
  //           fill: "black"
  //         },
  //         sidebar: {
  //           // cursor: "pointer",
  //           refX: "0",
  //           refX2: -20,
  //           refY2: -10,
  //           refY: "50%",
  //           d: "M 0 0 H 20 L 10 10 L 0 0"
  //         }
  //       },
  //     },
  //     {
  //       markup: [
  //         {
  //           tagName: "rect",
  //           selector: "body"
  //         },
  //         {
  //           tagName: "text",
  //           selector: "label"
  //         },
  //         {
  //           tagName: "path",
  //           selector: "sidebar"
  //         },
  //         {
  //           tagName: "text",
  //           selector: "sidebarLabel"
  //         }
  //       ]
  //     }
  //   )
  // };


  return (
    <div className="rule">
      {/*<button type="button" onClick={tee}>Button</button>*/}
      <div className="rule__sidebar" ref={sidebar}/>
      <div className="canvas" ref={canvas}/>
      <div id="inspector" className="rule__sidebar2"/>
    </div>



    // <div style={styles}>
    //   <div className="App">
    //     {/*<h1>Hello CodeSandbox</h1>*/}
    //     {/*<h2>Start editing to see some magic happen!</h2>*/}
    //     <div id="canvas" />
    //   </div>
    //   {/*<h2>Start editing to see some magic happen {"\u2728"}</h2>*/}
    //   {/*<div*/}
    //   {/*  ref={(ref) => {*/}
    //   {/*    this.reference = ref;*/}
    //   {/*  }}*/}
    //   {/*/>*/}
    // </div>
  );
}

export default App;

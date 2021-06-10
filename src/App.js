import React, {useState, useEffect, useRef} from 'react';
import {dia, ui, shapes, setTheme} from '@clientio/rappid';
import './App.scss';


const App = () => {
  const canvas = useRef(null);
  const sidebar = useRef(null);
  const navig = useRef(null);
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
      width: 2000,
      height: 2000,
      model: graph,
      // className: "paper__main",
      frozen: true,
      async: true,
      // drawGrid: true
      // drawGrid: {
      //   name: 'doubleMesh',
      //   args: [
      //     { color: 'red', thickness: 1 }, // settings for the primary mesh
      //     { color: 'green', scaleFactor: 5, thickness: 5 } //settings for the secondary mesh
      //   ]}
    });

    const scroller = new ui.PaperScroller({
      paper,
      autoResizePaper: true,
      cursor: 'grab'
    });

    const commandManager = new dia.CommandManager({
      graph: graph
    });

    const nav = new ui.Navigator({
      paperScroller: scroller,
      width: 300,
      height: 200,
      padding: 10,
      // zoomOptions: { max: 2, min: 1 }
    });
    // nav.$el.appendTo('#navigator');



    const stencil = new ui.Stencil({
      paper: paper,
      // width: 200,
      // height: 400,
      groupsToggleButtons: true,

      search: function (element, keyword, groupId, stencil) {
        // console.log("element.get('label')", element.attr(['label', 'text']))
        return element.attr(['label', 'text']).includes(keyword) || groupId.includes(keyword);
      },
      groups: {
        if: {label: 'If', index: 1},
        then: {label: 'Then', index: 2, closed: true,},
      }
    });

    stencil.on('element:drag', (cloneView, evt, dropArea, validDropTarget) => {
      const model = cloneView.model;
      model.attr('sidebarLabel/transform', 'translate(-8px, 0) rotate(270deg)');
      cloneView.vel.attr('opacity', validDropTarget ? 1 : 0.3)
    });

    stencil.on('element:dragend', (cloneView, evt, dropArea, validDropTarget) => {
      const model = cloneView.model;

      console.log("fgfd")
      // model.removeAttr('switcherG')
      // model.removeAttr('switcherMenu')
      // model.removeAttr('switcherMenuOf')
      // model.removeAttr('switcherMenuOn')
      // model.removeAttr('switcherOfLabel')
      // model.removeAttr('switcherOnLabel')

      // model.attr('switcherMenuOf/visibility', 'hidden');
      // model.attr('switcherMenuOn/visibility', 'hidden');
      // model.attr('switcherOfLabel/visibility', 'hidden');
      // model.attr('switcherOnLabel/visibility', 'hidden');

    });

    const toolbar = new ui.Toolbar({
      references: {
        paperScroller: scroller,
        commandManager: commandManager
      },

      tools: [
        { type: 'checkbox' },
        { type: 'range', name: 'slider', min: 0, max: 10, step: 1 },
        { type: 'separator' },
        { type: 'toggle', name: 'toggle', label: ''},
        'separator',  // also possible, use defaults
        { type: 'inputText' },
        { type: 'button', name: 'ok', text: 'Ok' },
        { type: 'button', name: 'cancel', text: 'Cancel' },
        // { type: 'undo' },
        // { type: 'redo' },
        { type: 'separator' },
        // { type: 'zoomSlider' , min: 20, max: 300, },
        { type: 'fullscreen' }
      ]
    });

    // $('body').append(toolbar.render().el);

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
    canvas.current.appendChild(scroller.el);
    canvas.current.appendChild(toolbar.el);

    sidebar.current.appendChild(stencil.el);
    // canvas.current.appendChild(paper.el)
    navig.current.appendChild(nav.el)

    // nav.$el.appendTo('#navigator');

    stencil.render();
    paper.render();
    nav.render();
    // scroller.render().center();
    scroller.render();
    toolbar.render();


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
            visibility: 'hidden',
          },
          switcherMenuOf: {
            event: 'element:buttonOf:pointerdown',
          },
          switcherMenuOn: {
            event: 'element:buttonOn:pointerdown',
          },
          switcherOfLabel: {
            text: of.toUpperCase(),
            // refX: 62,
            // refY: 62,
          },

          switcherOnLabel: {
            text: on.toUpperCase(),
            // refX: 62,
            // refY: 47,
          }

        },
        markup: [
          {tagName: "rect", selector: "body", className: "body"},
          {tagName: "text", selector: "label"},
          {tagName: 'image', selector: 'image'},
          {tagName: "rect", selector: "sidebar",},
          {tagName: "text", selector: "sidebarLabel", className: "sidebar__label"},
          {tagName: "rect", selector: "switcher"},
          {
            tagName: "g",
            selector: "switcherG",
            children: [
              {tagName: 'rect', selector: 'switcherMenu', groupSelector: "G-group", className: "switcher__menu"},
              {tagName: 'rect', selector: 'switcherMenuOf', groupSelector: "G-group", className: "switcher__block"},
              {tagName: 'rect', selector: 'switcherMenuOn', groupSelector: "G-group", className: "switcher__block"},
              {tagName: 'text', selector: 'switcherOfLabel', groupSelector: "G-group", className: "switcher__label"},
              {tagName: 'text', selector: 'switcherOnLabel', groupSelector: "G-group", className: "switcher__label"}
            ]
          },
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

    const block1 = new shapes.standard.Rectangle({
      rotateAngleGrid: 70,
      size: {width: 100, height: 54},
      position: {x: 200, y:60},
      attrs: {
        label: {
          text: 'ffff'
        },
        body: {
          angle: 90
        }
      },


    })

    const whenListBlocks = data.map((item) => {
      let block = new shapes.standard.Rectangle(configBlock(item.name, "if", "red", "green"));
      // console.log("block", block)
      block.set('position', item.position);
      // block.set('angle', 90)

      return block
    });

    const whenListBlocks2 = data2.map((item) => {
      let block = new shapes.standard.Rectangle(configBlock(item.name, "then", "blue", "green"));
      block.set('position', item.position);

      return block
    });


    stencil.load({if: [...whenListBlocks], then: [...whenListBlocks2]})

    // graph.addCell([block1]);


    paper.on('cell:pointerup', (cellView) => {
      // const attrs = ["switcherMenu", "switcherMenuOf", "switcherMenuOn", "switcherOfLabel", "switcherOnLabel"]
      // We don't want a Halo for links.
      if (cellView.model instanceof dia.Link) return;
      let model = cellView.model;

      const halo = new ui.Halo({
        cellView: cellView,
        // type: 'pie',
        // type: 'toolbar'
      });

      console.log("cellView", cellView)

      halo.addHandle({name: 'switcher', position: 's', icon: `${process.env.PUBLIC_URL}/assets/menu.png`});
      halo.on('action:switcher:pointerdown', function (evt) {
        evt.stopPropagation();
        // let model = halo.options.cellView.model;

        const styles = [
          {name: 'switcherMenu', style: {refX: 60, refY: 45}},
          {name: 'switcherMenuOf', style: {refX: 60, refY: 60}},
          {name: 'switcherMenuOn', style: {refX: 60, refY: 45}},
          {name: 'switcherOfLabel', style: {refX: 62, refY: 62}},
          {name: 'switcherOnLabel', style: {refX: 62, refY: 47}},
        ];


        // model.removeAttr('switcherMenuOf', gg)
        model.attr('switcherG/visibility', 'visible');

        styles.map((item) => {
          model.attr(item.name, item.style)
        });

        halo.remove()

      });

      halo.render();
    });

    graph.on('add', function (cell, collection, opt) {
      // The stencil adds the `stencil` property to the option object with value
      // set to a client id (`cid`) of the stencil view.
      console.log("collection", collection)
      const attrs = ["switcherMenu", "switcherMenuOf", "switcherMenuOn", "switcherOfLabel", "switcherOnLabel"];
      const models = collection.models;


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
    paper.on('element:pointerdown', function (elementView) {

      console.log("elementView", elementView)
      ui.Inspector.create('#inspector', {
        cell: elementView.model,
        inputs: {
          attrs: {
            circle: {
              fill: {
                type: 'color-palette',
                options: [
                  {content: '#FFFFFF'},
                  {content: '#FF0000'},
                  {content: '#00FF00'},
                  {content: '#0000FF'},
                  {content: '#000000'}
                ],
                label: 'Fill color',
                group: 'presentation',
                index: 1
              },
              stroke: {
                type: 'color-palette',
                options: [
                  {content: '#FFFFFF'},
                  {content: '#FF0000'},
                  {content: '#00FF00'},
                  {content: '#0000FF'},
                  {content: '#000000'}
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
            },
            properties: {

              'font-size': {
                type: 'range',
                min: 5,
                max: 30,
                label: 'Font size',
                group: 'properties',
                index: 1
              },
              'font-family': {
                type: 'select',
                options: ['Arial', 'Times New Roman', 'Courier New'],
                label: 'Font family',
                group: 'properties',
                index: 2
              }
            }
          }
        },
        groups: {
          properties: {
            label: 'Properties',
            index: 1
          },
          presentation: {
            closed: true,
            label: 'Presentation',
            index: 2
          },
          text: {
            closed: true,
            label: 'Text',
            index: 3
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
      const attrs = ["switcherMenu", "switcherMenuOf", "switcherMenuOn", "switcherOfLabel", "switcherOnLabel"]

      attrs.map(attr => {
        model.attr(attr, {refX: 0, refY: 0})
      })

      model.attr('switcherG/visibility', 'hidden');

      model.attr('switcher/fill', 'red');

    });
    paper.on('element:buttonOn:pointerdown', function (elementView, evt) {
      // Stop any further actions with the element view e.g. dragging
      evt.stopPropagation();
      // console.log("elementView.model", elementView)
      let model = elementView.model;
      const attrs = ["switcherMenu", "switcherMenuOf", "switcherMenuOn", "switcherOfLabel", "switcherOnLabel"];

      attrs.map(attr => {
        model.attr(attr, {refX: 0, refY: 0})
      })

      // console.log("first", model.removeAttr('switcherMenu'))

      model.attr('switcherG/visibility', 'hidden');
      model.attr('switcher/fill', 'green');
      //   model.attr('buttonLabel/text', '＋'); // fullwidth plus
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
      <div className="rule__sidebar2">
        <div id="inspector" />
        <div id="navigator" ref={navig}/>
      </div>
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

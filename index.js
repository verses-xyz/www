const c = document.getElementById("canvas")
const ctx = c.getContext("2d")

var x = 0
var y = 0
var w = 0
var h = 0
var animationFrameHandle = 0
var then = Date.now()

const fps = 5
const fpsInterval = 1000 / fps
const cellSize = 10

var cells = []

class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.alive = Math.random() > 0.85
    this.nextAlive = false
    this.age = 0
  }

  static get(x, y) {
    const i = x + (y * Math.ceil(w / cellSize))
    return cells[i]
  }

  static isAlive(x, y) {
    const i = x + (y * Math.ceil(w / cellSize))
    if (i < 0 || i >= cells.length) {
      return false
    }
    return cells[i].alive ? 1 : 0
  }

  update() {
    const x = this.x
    const y = this.y
    const numAlive = Cell.isAlive(x - 1, y - 1) +
      Cell.isAlive(x, y - 1) +
      Cell.isAlive(x + 1, y - 1) +
      Cell.isAlive(x - 1, y) +
      Cell.isAlive(x + 1, y) +
      Cell.isAlive(x - 1, y + 1) +
      Cell.isAlive(x, y + 1) +
      Cell.isAlive(x + 1, y + 1)

    if (numAlive == 2) {
      this.age++
      this.nextAlive = this.alive
    } else if (numAlive == 3) {
      this.nextAlive = true
      this.age = 0
    } else {
      this.age++
      this.nextAlive = false
    }
  }

  draw() {
    this.alive = this.nextAlive
    const beingHovered = x == this.x && y == this.y
    if (this.alive || beingHovered) {
      ctx.fillStyle = `rgba(169, 186, 164, ${Math.max(0, Math.pow(Math.E, -this.age / 2)) / 6})`
      ctx.fillRect(this.x * cellSize, this.y * cellSize, cellSize, cellSize)
      // ctx.beginPath()
      // ctx.arc(this.x - cellSize + cellSize / 2, this.y * cellSize + cellSize / 2, cellSize / 2, 0, 2 * Math.PI, false)
      // ctx.fill()
    }
  }
}

function gameloop() {
  window.requestAnimationFrame(gameloop)
  const now = Date.now()
  const elapsed = now - then
  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval)

    // draw frame
    ctx.clearRect(0, 0, c.width, c.height)
    for (const c of cells) {
      c.update()
    }
    for (const c of cells) {
      c.draw()
    }
  }
}

var windowWidth = 0
function redrawCanvas() {
  if (window.innerWidth != windowWidth) {
    windowWidth = window.innerWidth

    w = Math.ceil(c.offsetWidth)
    ctx.canvas.width = w
    h = Math.ceil(c.offsetHeight)
    ctx.canvas.height = h

    if (animationFrameHandle) {
      cancelAnimationFrame(animationFrameHandle)
    }

    cells = []
    for (let y = 0; y < Math.ceil(h / cellSize); y++) {
      for (let x = 0; x < Math.ceil(w / cellSize); x++) {
        cells.push(new Cell(x, y))
      }
    }

    animationFrameHandle = window.requestAnimationFrame(gameloop)
  }
}

function manuallySpawnCell(x, y) {
  const cell = Cell.get(x, y)
  cell.alive = true
  cell.age = 0
  cell.draw()
  cell.alive = true
}

document.getElementById("context-pane").addEventListener("mousemove", function(e) {
  const bounds = c.getBoundingClientRect()
  x = Math.round((event.clientX - bounds.left) / cellSize) - 1
  y = Math.round((event.clientY - bounds.top) / cellSize)
  manuallySpawnCell(x, y)
})

redrawCanvas()
window.addEventListener('resize', redrawCanvas)

// artifact about
const artifactAbout = document.getElementById("artifact-about")
const artifactAboutText = createTelescopicTextFromBulletedList(`
- We
- believe in the value of speculative, experimental work that expands the bounds of collective possibility, imagination, and agency.
  - aim to develop artifacts that combine philosophical and cultural work alongside technical tooling and infrastructure to advocate for new digital norms and practices. The majority of our work falls into these three (non-exclusive) categories:
  - <ol><li>Artifacts as tools and infrastructure</li><li>Artifacts as statements</li><li>Artifacts as play or art</li></ol> 
`, {
  htmlContainerTag: "div",
  textMode: "html",
})
artifactAbout.appendChild(artifactAboutText)

// drops rendering
const artifactList = document.getElementById("artifact-list")
const drops = [
  {
    id: "declaration",
    name: "A Declaration of the Interdependence of Cyberspace",
    date: "11/08/2021",
    links: [
      {
        title: "Site",
        href: "https://www.interdependence.online/declaration",
      },
      {
        title: "Source (frontend)",
        href: "https://github.com/verses-xyz/interdependence-web",
      },
      {
        title: "Source (server)",
        href: "https://github.com/verses-xyz/interdependence-server",
      }
    ],
    context: `
- We want not just independence, but
- interdependence.
  - interdependence. Today we sit at another inflection point in the trajectory of the web.
- This work was precipitated by Facebook's rebranding as Meta, & is a direct fork of Barlow's Declaration,
- a foundational cyberpunk text. 
  - which describes dreams for a freer cyberspace, but today we find his document insufficient.
- We're interested in the poetics of infrastructure, or how the different parts of a software object come together and produce effects on the viewer.
- Viewers are able to either
- sign
  - sign (A signature is not removable. It's an alliance with the values, infrastructure, and labour behind the piece)
- or
- fork
  - fork (A fork is a productive step forward, a defining of an alternate vision)
- the
- declaration.
  - declaration, all of which lives on
  - Arweave.
    - Arweave. We wanted to show the beauty of a non-financial use of blockchain, & also ensure that the experience was accessible.
- This work is authorless because it is authored in the spiritual sense by
- many more people than we could feasibly name.
  - many more than we could name here. We owe debts to communities that we are part of, teachers who have guided us, and ancestors in various lineages that we now steward.`
  },
  {
    id: "pluriverse",
    name: "Pluriverse",
    date: "02/09/2022",
    links: [
      {
        title: "Site",
        href: "https://pluriverse.world/"
      },
      {
        title: "Source",
        href: "https://github.com/verses-xyz/pluriverse"
      }
    ],
    context: `
- The Pluriverse artifact is a call to imagine, steward, and create a digital
- pluriverse.
  - pluriverse: a world in which many worlds may fit. We offer this work as a values-laden alternative to the Metaverse. We imagine a transition from the monocultures and monopolies of the present to a flowering of worlds and possibilities.
- We see the digital pluriverse as a space of regenerative scale and co-creation, that can challenge illegitimate power through a mosaic of communal, alternative, and autonomous cultural and economic worlds.
- The pluriverse is a
- collaborative project.
  - collaborative project; our hope is to provide the beginnings of an architecture that may facilitate and support this process of co-constitution.
- For this, we turn to
- pattern languages.
  - pattern languages: modular, structured without prescription, and targeted towards practical design.
  - We are excited about the potential of these pattern languages for enabling communities to define their own values in ways that are participatory, repairable, maintainable, and evolving, and to apply principles to concrete organizational and technological decisions.
- We invite you and others to plant and garden these seeds, so that this language may
- grow.
  - grow, evolving through intention and use, like all living languages.
  - We hope this may lay the groundwork for building tangible instantiations of a shared pluriversal vision.
    `
  },
  {
    id: "poems",
    name: "Shapeshifting Poetry",
    date: "04/26/2022",
    links: [
      {
        title: "Site",
        href: "https://poems.verses.xyz/"
      },
      {
        title: "Source",
        href: "https://github.com/verses-xyz/poems"
      }
    ],
    context: `
- This is a living library of
- shapeshifting
  - transforming
    - morphing
      - evolving
- verses, created by the verses community because
- we wanted to explore mediums for
- software poetry.
  - software that allows for different kinds of poetry.
    - software that enables different kinds of beauty.
      - poems and art and technology and different combinations thereof.
        - creating beautiful technology.
          - creating beautiful things with beautiful people :)
- These poems are written using a technique called telescopic text which initially was done for a very functional reason, allowing writers to display a high-level summary for more context that dynamically appears as the user desires, a form of in-line footnotes. 
- But what about text that changes for the sole purpose of changing, or for purely poetic reasons?
  - How does meaning shift as the text changes with engagement?
    - How can the reader create, and choose, their own meaning as they explore in the textual landscape?
      - Most interestingly, how would this new affordance shape what kinds of verses people feel moved to, and able to, write?
    `
  },
]

drops.forEach(drop => {
  const dropDiv = document.createElement("li")
  dropDiv.id = `drop_${drop.id}`
  dropDiv.classList.add("drop")
  const date = document.createElement("p")
  date.classList.add("date")
  date.innerText = drop.date
  dropDiv.appendChild(date)

  // slightly hacky way to indent all by one and add a 'Read more'
  const context = createTelescopicTextFromBulletedList(`
- <h3>${drop.name}</h3>
  - <h3>${drop.name}</h3>
${drop.context.replace(/- /g, '  - ')}
`, {
    textMode: "html"
  })

  dropDiv.appendChild(context)
  drop.links.forEach(l => {
    const link = document.createElement("a")
    link.href = l.href
    link.innerHTML = `${l.title} &#8599;`
    dropDiv.appendChild(link)
  })

  artifactList.appendChild(dropDiv)
})

// render main content
const aboutVerse = `
- *Verses* aims to
- be a persistent institution dedicated to articulating visions for a flourishing collectie future.
  - contribute to a clearer set of technologies, infrastructures, institutions, and processes that realize the ethic of the pluriverse in the concrete and material.
- We build together towards a cyberspace that is interdependent.
- As such, we follow a method of loose collaboration which we call
- "stone soup".
  - "stone soup". Rather than being formally led by a fixed group, we find and engage contributors for projects as they evolve from idea to completion, so that individuals with different talents can bring their contributions to the table.
`

const collaborationVerse = `
- On a broader scale, Verses works on
- objects,
  - objects (creating artifacts, seeding frameworks and structure, mapping ecosystems),
- philosophies,
  - philosophies (navigating contradiction, permitting sensemaking, building a prefigurative politics for pluriversality),
- community,
  - community (maintaining and caring for the Verses community, extending care in tendrils to connected communities and space at large),
- capacity,
  - capacity (enabling others to act on and materialize this prefiguration, predistributing and redistributing resources),
- and
- infrastructure.
  - infrastructure (operational and structural tasks to cohere the above, and building scaffolding for objects, philosophies, and capacity-building to take place).
`

const makeMagicDiv = (artifactName) => (lineText) => {
  const magic = document.createElement("span")
  magic.innerText = lineText
  magic.classList.add("magic")

  const dropDiv = document.getElementById(`drop_${artifactName}`)
  magic.addEventListener("mouseover", () => {
    dropDiv.classList.add("drop-highlight")
    const offset = dropDiv.offsetTop
    document.getElementById("context-pane").scrollTo({
      top: offset - 24, // add some extra viewing padding
      behavior: "smooth"
    })
  })

  magic.addEventListener("mouseout", () => {
    dropDiv.classList.remove("drop-highlight")
  })

  return magic
}

const config = {
  specialCharacters: {
    "--": () => {
      const sp = document.createElement("span")
      sp.innerHTML = "&mdash;"
      return sp
    },
    "\\*(.*)\\*": (lineText) => {
      const el = document.createElement("strong")
      el.appendChild(document.createTextNode(lineText))
      return el
    },
    "(pluriverse|pluriversality)": makeMagicDiv("pluriverse"),
    "(interdependent)": makeMagicDiv("declaration"),
  }
}

const about = createTelescopicTextFromBulletedList(aboutVerse, config)
const collaboration = createTelescopicTextFromBulletedList(collaborationVerse, config)
const content = document.getElementById("about")
content.appendChild(about)
content.appendChild(collaboration)

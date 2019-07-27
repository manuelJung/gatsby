const { joinPath } = require(`gatsby-core-utils`)
const requiresWriter = require(`../requires-writer`)

const now = 1564229078922

const newMockState = () => {
  const pages = new Map()
  pages.set(`path1`, {
    component: `component1`,
    componentChunkName: `chunkName1`,
    matchPath: `matchPath1`,
    path: `/path1`,
  })
  pages.set(`path2`, {
    component: `component2`,
    componentChunkName: `chunkName2`,
    widgets: {
      WidgetA: `widget1`,
    },
    widgetChunkNames: {
      WidgetA: `widgetChunkName1`,
    },
    path: `/path2`,
  })
  const program = { directory: `/dir` }
  return { pages, program }
}

jest.mock(`fs-extra`, () => {
  return {
    writeFile: () => Promise.resolve(),
    move: () => {},
  }
})

const mockFsExtra = require(`fs-extra`)

describe(`requires-writer`, () => {
  beforeEach(() => {
    global.Date.now = () => now
    requiresWriter.resetLastHash()
  })
  describe(`writeAll`, () => {
    it(`writes requires files`, async () => {
      const spy = jest.spyOn(mockFsExtra, `writeFile`)
      await requiresWriter.writeAll(newMockState())
      expect(spy).toBeCalledWith(
        joinPath(`/dir`, `.cache`, `match-paths.json.${now}`),
        JSON.stringify([{ path: `/path1`, matchPath: `matchPath1` }], null, 4)
      )
      expect(spy).toMatchSnapshot()
    })
  })
})

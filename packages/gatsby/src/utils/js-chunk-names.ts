import { kebabCase } from "lodash"
import path from "path"
import { store } from "../redux"

export const generateComponentChunkName = (componentPath: string): string => {
  const program = store.getState().program
  let directory = `/`
  if (program && program.directory) {
    directory = program.directory
  }
  const name = path.relative(directory, componentPath)
  return `component---${kebabCase(name)}`
}

const generateWidgetChunkName = widgetPath => {
  const program = store.getState().program
  let directory = `/`
  if (program && program.directory) {
    directory = program.directory
  }
  const name = path.relative(directory, widgetPath)
  return `widget---${kebabCase(name)}`
}

exports.generateComponentChunkName = generateComponentChunkName
exports.generateWidgetChunkName = generateWidgetChunkName

import { MessageBlock, MessageBlockType } from '@renderer/types/newMessage'

/**
 * 构造带工具调用结果的消息内容
 * @param blocks
 * @returns
 */
export function getContentWithTools(blocks: MessageBlock[]) {
  let constructedContent = ''
  for (const block of blocks) {
    if (block.type === MessageBlockType.MAIN_TEXT || block.type === MessageBlockType.TOOL) {
      if (block.type === MessageBlockType.MAIN_TEXT) {
        constructedContent += block.content
      } else if (block.type === MessageBlockType.TOOL) {
        // 如果是工具调用结果，为其添加文本消息
        if (block.type === MessageBlockType.TOOL) {
          let resultString =
            '\n\nAssistant called a tool.\nTool Name:' +
            block.metadata?.rawMcpToolResponse?.tool.name +
            '\nTool call result: \n```json\n'
          try {
            resultString += JSON.stringify(
              {
                params: block.metadata?.rawMcpToolResponse?.arguments,
                response: block.metadata?.rawMcpToolResponse?.response
              },
              null,
              2
            )
          } catch (e) {
            resultString += 'Invalid Result'
          }
          constructedContent += resultString + '\n```\n\n'
        }
      }
    }
  }
  return constructedContent
}

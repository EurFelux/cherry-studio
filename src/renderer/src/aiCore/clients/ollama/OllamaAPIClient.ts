import { GenericChunk } from '@renderer/aiCore/middleware/schemas'
import { DEFAULT_MAX_TOKENS } from '@renderer/config/constant'
import Logger from '@renderer/config/logger'
import { findTokenLimit, isClaudeReasoningModel, isReasoningModel, isWebSearchModel } from '@renderer/config/models'
import { getAssistantSettings } from '@renderer/services/AssistantService'
import FileManager from '@renderer/services/FileManager'
import { estimateTextTokens } from '@renderer/services/TokenService'
import {
  Assistant,
  EFFORT_RATIO,
  FileTypes,
  MCPCallToolResponse,
  MCPTool,
  MCPToolResponse,
  Model,
  Provider,
  ToolCallResponse,
  WebSearchSource
} from '@renderer/types'
import {
  ChunkType,
  ErrorChunk,
  LLMWebSearchCompleteChunk,
  LLMWebSearchInProgressChunk,
  MCPToolCreatedChunk,
  TextDeltaChunk,
  ThinkingDeltaChunk
} from '@renderer/types/chunk'
import type { Message } from '@renderer/types/newMessage'
import {
  AnthropicSdkMessageParam,
  AnthropicSdkParams,
  AnthropicSdkRawChunk,
  AnthropicSdkRawOutput
} from '@renderer/types/sdk'
import { addImageFileToContents } from '@renderer/utils/formats'
import {
  anthropicToolUseToMcpTool,
  isEnabledToolUse,
  mcpToolCallResponseToAnthropicMessage,
  mcpToolsToAnthropicTools
} from '@renderer/utils/mcp-tools'
import { findFileBlocks, findImageBlocks, getMainTextContent } from '@renderer/utils/messageUtils/find'
import { buildSystemPrompt } from '@renderer/utils/prompt'

import { BaseApiClient } from '../BaseApiClient'
import { AnthropicStreamListener, RawStreamListener, RequestTransformer, ResponseChunkTransformer } from '../types'

export class OllamaAPIClient extends BaseApiClient {
  constructor(provider: Provider) {
    super(provider)
  }

  /**
   * 核心API Endpoint
   **/

  function createCompletions(payload: TSdkParams, options?: RequestOptions): Promise<TRawOutput> {

  }

  function generateImage(generateImageParams: GenerateImageParams): Promise<string[]> {

  }

  function getEmbeddingDimensions(model?: Model): Promise<number> {

  }

  function listModels(): Promise<SdkModel[]> {

  }

  function getSdkInstance(): Promise<TSdkInstance> | TSdkInstance {

  }

  /**
   * 中间件
   **/

  // 在 CoreRequestToSdkParamsMiddleware中使用
  function getRequestTransformer(): RequestTransformer<TSdkParams, TMessageParam> {

  }
  // 在RawSdkChunkToGenericChunkMiddleware中使用
  function getResponseChunkTransformer(): ResponseChunkTransformer<TRawChunk> {

  }

  /**
   * 工具转换
   **/

  // Optional tool conversion methods - implement if needed by the specific provider
  function convertMcpToolsToSdkTools(mcpTools: MCPTool[]): TSdkSpecificTool[] {

  }

  function convertSdkToolCallToMcp(toolCall: TToolCall, mcpTools: MCPTool[]): MCPTool | undefined {

  }

  function convertSdkToolCallToMcpToolResponse(toolCall: TToolCall, mcpTool: MCPTool): ToolCallResponse {

  }

  function buildSdkMessages(
    currentReqMessages: TMessageParam[],
    output: TRawOutput | string | undefined,
    toolResults: TMessageParam[],
    toolCalls?: TToolCall[]
  ): TMessageParam[] {

  }

  function estimateMessageTokens(message: TMessageParam): number {

  }

  function convertMcpToolResponseToSdkMessageParam(
    mcpToolResponse: MCPToolResponse,
    resp: MCPCallToolResponse,
    model: Model
  ): TMessageParam | undefined {

  }

  /**
   * 从SDK载荷中提取消息数组（用于中间件中的类型安全访问）
   * 不同的提供商可能使用不同的字段名（如messages、history等）
   */
  function extractMessagesFromSdkPayload(sdkPayload: TSdkParams): TMessageParam[] {

  }
}

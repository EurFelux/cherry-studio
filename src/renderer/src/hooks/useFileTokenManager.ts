import { estimateExternalTextFileTokens, estimateImageTokens } from '@renderer/services/TokenService'
import { FileType, FileTypes } from '@renderer/types'
import { KB, MB } from '@shared/config/constant'
import { floor } from 'lodash'
import { useEffect } from 'react'

interface UseFileTokenManagerProps {
  files: FileType[]
  onFilesChange: (updatedFiles: FileType[]) => void
}

export function useFileTokenManager({ files, onFilesChange }: UseFileTokenManagerProps) {
  // 异步计算 tokens 并更新 files
  useEffect(() => {
    files.forEach(
      async (file) => {
        if (file.tokens !== undefined) return // 跳过已处理的文件
        try {
          if (file.type === FileTypes.IMAGE) {
            const tokens = estimateImageTokens(file)
            onFilesChange(files.map((f) => (f.id === file.id ? { ...f, tokens } : f)))
          } else if (file.type === FileTypes.TEXT || file.type === FileTypes.DOCUMENT) {
            if (file.size >= 5 * MB) {
              // 大文件进行简单预估，而不读取文件内容。按照 180 token / KB 进行估算
              // pdf等文档估算不准确
              const tokens = floor((file.size / KB) * 180)
              onFilesChange(files.map((f) => (f.id === file.id ? { ...f, tokens } : f)))
            } else {
              // 小文件精确读取内容进行评估
              const tokens = await estimateExternalTextFileTokens(file)
              onFilesChange(files.map((f) => (f.id === file.id ? { ...f, tokens } : f)))
            }
          }
          // 跳过非文本文件和图片的文件
        } catch (error) {
          console.error(`Failed to calculate token for ${file.name}:`, error)
        }
      },
      [files, onFilesChange]
    ) // 依赖外部传入的 files
  })
}

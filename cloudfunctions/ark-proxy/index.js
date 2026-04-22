const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// 火山引擎方舟大模型配置
const ARK_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'
const ARK_API_KEY = process.env.ARK_API_KEY || '73c3e19e-2bb9-4a8e-917a-b8e20b35879a'
const MODEL_ID = 'ep-20260224204235-qmfjh'

const https = require('https')

function httpsPost(url, data, headers) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data)
    const urlObj = new URL(url)

    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...headers,
      },
    }

    const req = https.request(options, (res) => {
      let responseData = ''
      res.on('data', chunk => responseData += chunk)
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData))
        } catch {
          reject(new Error('响应解析失败: ' + responseData))
        }
      })
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

exports.main = async (event) => {
  const { messages, systemPrompt } = event

  if (!ARK_API_KEY) {
    return { error: 'ARK_API_KEY 未配置，请在云函数环境变量中设置' }
  }

  const requestBody = {
    model: MODEL_ID,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
    max_tokens: 2048,
    temperature: 0.85,
    top_p: 0.9,
  }

  try {
    const response = await httpsPost(
      ARK_API_URL,
      requestBody,
      { Authorization: `Bearer ${ARK_API_KEY}` },
    )

    if (response.error) {
      return { error: response.error.message ?? '方舟API调用失败' }
    }

    const content = response.choices?.[0]?.message?.content ?? ''
    return { content }
  } catch (err) {
    return { error: err.message ?? '网络请求失败' }
  }
}

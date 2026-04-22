export const config = {
  runtime: 'edge', // 使用 Edge Function 提高响应速度并规避默认 10s 超时
}

export default async function handler(req) {
  // 仅允许 POST 请求
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json()
    const ARK_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'
    
    // 从环境变量获取 ARK_KEY
    const ARK_KEY = process.env.ARK_KEY
    
    if (!ARK_KEY) {
      return new Response(JSON.stringify({ error: 'API Key not configured. Please set ARK_KEY in environment variables.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 将请求透传给方舟 API
    const response = await fetch(ARK_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ARK_KEY}`
      },
      body: JSON.stringify(body)
    })

    // 检查响应状态
    if (!response.ok) {
      const errText = await response.text()
      console.error('[ARK API Error]', response.status, errText)
      return new Response(errText, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // 获取成功数据
    const data = await response.json()
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('[Server Error]', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
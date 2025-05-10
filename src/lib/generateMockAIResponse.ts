// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateMockAIResponse = (_userMessage: string): Promise<string> => {
    const responses = [
        "그것은 흥미로운 질문이네요. 더 자세히 알려주실 수 있을까요?",
        "네, 도와드리겠습니다. 어떤 정보가 필요하신가요?",
        "그 주제에 대해서는 여러 관점이 있습니다. 먼저 기본적인 개념부터 설명드리자면...",
        "좋은 질문입니다! 이 문제는 여러 단계로 접근할 수 있습니다.",
        "제가 이해한 바로는, 이 문제를 해결하기 위한 몇 가지 방법이 있습니다.",
        "이 주제는 최근에 많은 발전이 있었습니다. 최신 연구에 따르면...",
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(randomResponse)
        }, 1500)
    })
}
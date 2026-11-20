window.QUIZ_RECOVERY = {
  "v": 2,
  "bankId": "a254a670d9cf2147f2744efff3a0ecc146370b7eaa5bcd7aafc67d92bd0b7e4c",
  "questions": {
    "bank326-1713": {
      "id": "bank326-1713",
      "q": "关于Qwen-Max、CosyVoice 和moviepy 的协同使用，以下哪些说法是正确的？",
      "opts": [
        "CosyVoice 可以将文本转换为音频。",
        "CosyVoice 的主要功能是视频剪辑。",
        "moviepy 可以直接将文本转换为视频。",
        "Qwen-Max 主要用于生成视频字幕。",
        "moviepy 可以用来获取音频文件的持续时间，用于生成字幕。",
        "使用这三个工具的典型流程是，Qwen-Max -> CosyVoice -> moviepy。"
      ],
      "ans": "AEF",
      "type": "multi",
      "chap": "2.1"
    },
    "bank326-1715": {
      "id": "bank326-1715",
      "q": "通过Llamaindex 创建RAG 应用，这段代码有哪些问题？\npython\nquery_engine = index.as_query_engine(\nsimilarity_top_k=3,\nstreaming=True,\nnode_postprocessors=[\nDepthScopeRank(top_n=8, model=\"gte-rerank\"),\nSimilarityPostprocessor(similarity_cutoff=1)]\n)\nresponse = query_engine.retrieve(\"需求分析使用的工具是什么？\")\nresponse.print_response_stream()",
      "opts": [
        "query_engine 不支持retrieve",
        "重排选中的chunk 数大于初步召回的chunk 数",
        "相似度阈值设置过高",
        "Llamaindex 在RAG 回答时不可以使用流式输出"
      ],
      "ans": "ABC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank326-1744": {
      "id": "bank326-1744",
      "q": "top_p (nucleus sampling) 参数的主要作用是什么？",
      "opts": [
        "控制模型使用的CPU 核心数量。",
        "控制模型生成文本的长度。",
        "控制模型输出的格式。",
        "控制模型只考虑概率最高的几个词，例如这里设置0.9，则模型只考虑累积概率前90% 的词"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1769": {
      "id": "bank326-1769",
      "q": "你需要使用Qwen-Max 生成一个关于“Python 基础” 的课程脚本。以下哪种请求方式最\n合适？",
      "opts": [
        "向Qwen-Max 发送一条包含“Python 基础课程脚本” 的请求，并附加一些示例代码。",
        "向Qwen-Max 发送一条详细描述课程目标和内容的请求，例如：“请生成一个Python 基础课 程脚本，包含变量、数据类型、运算符、控制流等内容。”",
        "向Qwen-Max 发送多条分别包含“Python 变量”、 “Python 数据类型”、 “Python 运算符” 等 关键词的请求。",
        "向Qwen-Max 发送一条包含“Python” 关键词的请求。"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1771": {
      "id": "bank326-1771",
      "q": "以下代码片段中，temperature 参数设置为0.6，其主要作用是什么？\nplaintext\n{\n\"do_sample\": true,\n\"temperature\": 0.6,\n\"top_p\": 0.9,\n}\n# other parameters\n...",
      "opts": [
        "控制模型使用的GPU 数量。",
        "控制模型加载的权重数量。",
        "控制模型生成文本的多样性。",
        "控制模型生成文本的长度。"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1773": {
      "id": "bank326-1773",
      "q": "在使用Qwen-Max 辅助内容生成的过程中，以下哪个操作是正确的？",
      "opts": [
        "让Qwen-Max 执行编程代码",
        "利用Qwen-Max 生成课程脚本",
        "应用Qwen-Max 进行视频剪辑任务",
        "直接使用Qwen-Max 进行图像设计"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1774": {
      "id": "bank326-1774",
      "q": "在检测文档内容中是否存在营销性表达时，下列哪种方法可以更全面地识别问题？",
      "opts": [
        "识别所有内容错误的部分",
        "让大模型自动修改内容",
        "逐条单独识别营销词汇",
        "一次性生成所有类型的识别结果"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1788": {
      "id": "bank326-1788",
      "q": "如果想要自定义langchain 的LLM 对象，理论上只需要准备以下哪个要素？",
      "opts": [
        "一个API Key",
        "一个Model name",
        "一个JSON，直接加载即可",
        "一个输入为字符串，输出为字符串的函数"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1789": {
      "id": "bank326-1789",
      "q": "如果想要发送“你好，请介绍一下你自己” 给大模型，应该修改以下代码的哪一行？\npython\nimport os\nfrom openai import OpenAI\nclient = OpenAI(\napi_key=os.getenv(\"DASHSCOPE_API_KEY\"),\nbase_url=\"https://dashscope.aliyuncs.com/compatible-mode/v1\"\n)\ncompletion = client.chat.completions.create(\nmodel=\"qwen-max\",\nmessages=[{\"role\": \"user\", \"content\": \"你是谁？\"}]\n)\nprint(completion.choices[0].message.content)",
      "opts": [
        "messages=[{\"role\": \"user\", \"content\": \"你是谁？\"}]",
        "api_key=os.getenv(\"DASHSCOPE_API_KEY\")",
        "base_url=\"https://dashscope.aliyuncs.com/compatible-mode/v1\"",
        "model=\"qwen-max\""
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1797": {
      "id": "bank326-1797",
      "q": "def set_default_model():\nEMBED_MODEL = DashScopeEmbedding(\nmodel_name=DashScopeTextEmbeddingsModels.TEXT_EMBEDDING_V2,\ntype_name=DashScopeTextEmbeddingType.TEXT_TYPE_DOCUMENT,\n)\nLLM_MODEL = DashScope(model_name=\"qwen-plus\")\nSettings.embed_model = EMBED_MODEL\nSettings.llm = LLM_MODEL\n...",
      "opts": [
        "使得llm 可以流式输出",
        "使得embedding 模型可以参与llm 的生成过程中",
        "使得有关Llamaindex 的后续步骤中无需再次指定llm 与embed_model",
        "定义了EMBED_MODEL 与LLM_MODEL"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1798": {
      "id": "bank326-1798",
      "q": "以下哪种参数组合会使得模型生成结果最具多样性？",
      "opts": [
        "temperature = 0.1, top_p = 0.9",
        "temperature = 0.1, top_p = 0.1",
        "temperature = 0.9, top_p = 0.1",
        "temperature = 0.9, top_p = 0.9"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1820": {
      "id": "bank326-1820",
      "q": "关于temperature 和top_p 参数的作用，以下哪三个描述是正确的?",
      "opts": [
        "较低的top_p 可以提高生成内容的稳定性",
        "较低的temperature 可以增加生成内容的多样性",
        "通常情况下，只需调整其中一个参数即可。",
        "较高的temperature 可以增加生成内容的多样性"
      ],
      "ans": "ACD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank326-1821": {
      "id": "bank326-1821",
      "q": "以下哪些方案，有助于提升大模型应用的用户体验？",
      "opts": [
        "等全部内容生成后一次性返回",
        "展示任务处理进度",
        "生成的内容流式输出",
        "将任务分解为多个步骤，并且将分步执行过程展示给用户"
      ],
      "ans": "BCD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank326-1830": {
      "id": "bank326-1830",
      "q": "在多轮对话场景中，以下哪些方案，更有利于保障用户体验的同时，降低大模型使用成本？",
      "opts": [
        "在多轮对话场景中使用支持长上下文缓存的大模型API",
        "每次对话仅保留最近2 轮历史，避免携带过长的上下文",
        "按照100 的长度，对历史对话取截断，避免携带上下文过长",
        "在多轮对话场景中，避免始终传入完整的历史对话，而是用最早的历史对话做总结处理后携 带在对话中"
      ],
      "ans": "AD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank326-1835": {
      "id": "bank326-1835",
      "q": "大模型如何判断什么时候应该停止输出？",
      "opts": [
        "只会在输出长度达到阈值时停止",
        "需要用户手动打断",
        "在输出长度达到阈值，或输出特殊Token（如，end of sentence，即句子结束标记）",
        "当模型检测到生成内容与输入主题无关时自动停止"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1841": {
      "id": "bank326-1841",
      "q": "你在需要构建公文智能处理系统，用户上传PDF 文件，系统需自动识别文本内容并生成\n摘要。以下哪种架构设计比较合理？",
      "opts": [
        "前端上传文件至FC，FC 调用OCR 服务提取文本并存入OSS，再由百炼模型提供结果链接",
        "前端直接调用百炼模型解析PDF，模型将原始文件和分析结果存入OSS，通过访问链接提供 结果的访问",
        "OSS 仅存储最终摘要文件，原始PDF 通过FC 直传至百炼模型服务进行全流程处理",
        "前端上传PDF 至OSS，触发FC 解析文本，FC 调用百炼模型生成摘要，结果存入OSS 并前 端下载"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1842": {
      "id": "bank326-1842",
      "q": "某社交平台需自动屏蔽违规评论，要求同时处理文字、图片。以下哪种方案更合理？",
      "opts": [
        "延迟显示所有AI 生成内容等待人工审核",
        "建立独立的关键词库分别过滤文本和图片",
        "要求用户上传内容前手动选择内容分类标签",
        "使用多模态模型拦截图文混合违规内容，如qwen - v1 72b"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1849": {
      "id": "bank326-1849",
      "q": "你希望用阿里云百炼平台的通义千问大模型生成商品描述，但要求不同用户看到的内容略\n有差异，应如何实现？",
      "opts": [
        "启用enable_search 参数",
        "保持temperature=0.9 且不固定seed",
        "设置temperature=0.0",
        "使用完全相同的提示词"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1854": {
      "id": "bank326-1854",
      "q": "用户对你开发的聊天机器人提了反馈，总是要等10s 以上才能看到答案。你考虑是否要\n采取流式输出策略。以下想法正确的是：",
      "opts": [
        "可以采取流式输出，但是我要在原有基础上调整一下temperature 和top_p 等参数",
        "不能采取流式输出，将实时返回的结果立刻返回给前端界面是一件很难做到的事情",
        "不能采取流式输出，我调了好久的prompt 在流式输出时效果肯定会下降",
        "可以采取流式输出，但是我要修改一下返回层面的代码，比如适配流式输出的数据格式，并 且将return 改为yield"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1863": {
      "id": "bank326-1863",
      "q": "某企业计划通过阿里云百炼平台构建一个大模型应用，用于处理对实时性要求不高的任务\n（如离线招生生成、批量内容摘要提取等）。为了在满足业务需求的同时降低运行成本，以下哪\n种措施可以最有效地优化成本？",
      "opts": [
        "引入流式输出，降低模型推理成本",
        "调用最新且参数大的模型（如Qwen-max）通过更好的技术降低计算成本",
        "使用批量推理服务，离线方式处理数据",
        "调用支持上下文缓存（Context Cache）的模型减少重复请求的计算开销"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1867": {
      "id": "bank326-1867",
      "q": "你使用阿里云百炼平台的通义千问API 开发了聊天机器人，用户反馈：提问某地天气时\n模型总是无法回答。如何快速解决这个问题？",
      "opts": [
        "提前设置话术，在面对类似问题时可以直接将话术返回给用户",
        "通过复杂的工程手段，对用户的输入提取关键词，集成第三方搜索引擎，并将搜索结果返回 给大模型",
        "设置enable_search（联网搜索）参数，为通义千问API 引入联网能力",
        "在聊天界面显眼位置标注限制，不建议用户输入类似问题"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1875": {
      "id": "bank326-1875",
      "q": "在开发一个需要调用大模型API 的应用时，为了保护敏感信息不被泄露，以下哪种方式\n是处理API Key 的安全做法？",
      "opts": [
        "在代码中写入API Key",
        "将API Key 存储到环境变量中",
        "在代码注释中记录API Key",
        "将API Key 保存在公开的配置文件中"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1892": {
      "id": "bank326-1892",
      "q": "你在调用通义千问API 时设置了temperature（温度）参数，以下哪种说法是正确的？",
      "opts": [
        "温度参数越高，候选Token 的概率值之间的差距会变大，从而带来更高的随机性",
        "温度参数越高，低概率的候选Token 有概率超过高概率的候选Token 的概率",
        "温度参数越高，候选Token 的概率值会越接近，从而带来更高的随机性",
        "温度参数越高，越适合撰写技术报告、代码等有较高确定性需求的场景"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1904": {
      "id": "bank326-1904",
      "q": "哪些代码段涉及文本序列化和标准化?",
      "opts": [
        "tokenizer.texts_to_sequences(texts)",
        "pad_sequences(sequences,padding='post')",
        "vocab_size=len(tokenizer.word_index)+1",
        "sequences =[seq[:MAX_SEQ_LEN] for seq in sequences]",
        "texts =[preprocess(text)for text in texts] F .embedding_matrix=np.zeros((vocab_size,EMBEDDING_DIM))"
      ],
      "ans": "AE",
      "type": "multi",
      "chap": "2.1"
    },
    "bank326-1908": {
      "id": "bank326-1908",
      "q": "以下哪些选项属于流式输出相比于非流式输出的优势？",
      "opts": [
        "能够提升大模型回复的效果",
        "能够给用户带来良好的阅读体验",
        "能够加快大模型回复的速度",
        "在网络连接时不会造成可能存在的超时错误"
      ],
      "ans": "BD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank326-1919": {
      "id": "bank326-1919",
      "q": "以下哪种方式不符合Multi-Agent 的处理思想？",
      "opts": [
        "将文档的标题改写、表格单元格改写和语义分割都交给同一个大模型一次性完成。",
        "使用DashScopeParse 解析文档结构，再使用通义千问API 润色文本。",
        "使用规则引擎处理简单的文本格式转换，使用大模型处理复杂的语义理解任务。",
        "根据不同的子任务需求，选择不同的模型类型和参数。"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1937": {
      "id": "bank326-1937",
      "q": "如何获取大模型返回信息的文本内容？\npython\nimport osfrom openai import OpenAI\nclient=OpenAI(\napi_key=os.getenv(\"DASHSCOPE_API_KEY\"),\nbase_url=\"https://dashscope.aliyuncs.com/compatible-mode/v1\")\ncompletion=client.chat.completions.create(\nmodel=\"qwen-max\",\nmessages=[{\"role\":\"user\",\"content\":\"\n你\n是\n谁?\"}])print(completion.choices[0].message.content)",
      "opts": [
        "completion.choices[0]",
        "completion.message.content",
        "completion.choices[0].message.content",
        "completion.choices.content"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1939": {
      "id": "bank326-1939",
      "q": "在调用百炼大模型接口时，如何指定用户的输入内容？",
      "opts": [
        "将用户输入内容作为'messages'列表中字典的'content'字段的值传入",
        "将用户输入内容作为model 参数的值传入",
        "将用户输入内容作为api_key 参数的值传入",
        "将用户输入内容作为base_url 参数的值传入"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1947": {
      "id": "bank326-1947",
      "q": "如何从百炼大模型的接口返回结果中获取模型生成的文本？",
      "opts": [
        "python pythonprint(completion.message.content)",
        "python pythonprint(completion.choices[0].message)",
        "python pythonprint(completion.choices.message.content)",
        "python pythonprint(completion.choices[0].message.content)"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1953": {
      "id": "bank326-1953",
      "q": "你希望对于同一个提示词，让大模型每次都尽最大可能返回相同结果，可以调整哪个参数？",
      "opts": [
        "stream",
        "max_token",
        "api_key",
        "seed"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1962": {
      "id": "bank326-1962",
      "q": "你让大模型为科技新闻生成标题，但输出标题过于平淡（如“某公司发布新产品”）。以\n下哪种方法，更有助于生成你想要的标题：",
      "opts": [
        "调整输出格式：要求标题全部大写",
        "通过多轮对话，明确告诉大模型不满意：“我觉得不好，再改改”",
        "先增加上下文，补充产品关键信息，如果不好再会尝试增加一些样例",
        "补充新闻稿中的发布会日期、会场地址和与会者人数"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1967": {
      "id": "bank326-1967",
      "q": "以下哪行代码能够正确调用百炼qwen-max 模型进行对话补全？",
      "opts": [
        "python completion = client.chat.create( model=\"qwen-max\", messages=[{\"role\": \"user\", \"content\": \"你好\"}])",
        "python completion = client.chat.completions.create( model=\"qwen-max\", messages=[{\"role\": \"user\", \"content\": \"你好\"}])",
        "python completion = client.chat.completions.create( model=\"qwen-max\", records=[{\"role\": \"user\", \"content\": \"你好\"}])",
        "python completion = client.chat.Completions.create( model=\"qwen-max\", messages=[{\"role\": \"user\", \"content\": \" 你好\"}])"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1968": {
      "id": "bank326-1968",
      "q": "如果将top_p 设置为一个非常小的值，例如0.1,模型的生成结果会有什么特点?",
      "opts": [
        "生成结果长度会变短。",
        "生成结果更加保守，倾向于选择概率最高的少数几个词，多样性降低。",
        "生成结果长度会变长。",
        "生成结果更加多样化。"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1969": {
      "id": "bank326-1969",
      "q": "请问这个函数的主要作用是\n、、、\ndef set_default_model():\nEMBED_MODEL=DashScopeEmbedding(\nmodel_name=DashScopeTextEmbeddingModels.TEXT_EMBEDDING_V2,\ntext_type=DashScopeTextEmbeddingType.TEXT_TYPE_DOCUMENT,\n)\nLLM_MODEL=DashScope(model_name=\"qwen-plus\") Settings.embed_model=EMBED_MODEL\nSettings.Ilm=LLM_MODEL",
      "opts": [
        "定义了EMBED_MODEL 与LLM_MODEL",
        "使得embedding 模型可以参与LLM 的生成过程中",
        "使得LLM 可以流式输出",
        "使得有关Llamalndex 的后续步骤中无需再次指定LLM 与embed_model"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1973": {
      "id": "bank326-1973",
      "q": "在大语言模型微调的数据准备阶段，哪个操作是为了将文本拆分成单词或词汇单元?",
      "opts": [
        "文本翻译",
        "数据去重",
        "分词(Tokenization)",
        "文本摘要"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1980": {
      "id": "bank326-1980",
      "q": "在qwen-plus 对messages 进行回答后，如果你想按照当前对话基础继续提问，需要怎\n么做?\nLLM_MODEL=DashScope(model name=\"qwen-plus\")\nmessages=[ChatMessage(role=MessageRole.SYSTEM,content=\" 你负责教育内容开\n发公司的答疑，你的名字叫公司\n小蜜，你要回答学员的问题。\"),\nChatMessage(role=MessageRole.USER,content=\" 你好\")]",
      "opts": [
        "将大模型生成的Assistant Message 添加到messages 列表中",
        "对话历史跟着模型名称走，所以只要继续指定模型为qwen-plus 就可以了",
        "大模型不支持多轮对话",
        "将新的User Message 添加到messages 列表中"
      ],
      "ans": "AD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank326-1982": {
      "id": "bank326-1982",
      "q": "大模型在处理输入文本时，第一步通常执行的操作是？",
      "opts": [
        "计算候选Token 概率",
        "Token 可量化",
        "计算Embedding 后的向量",
        "对输入文本进行分词（Tokenize）"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank326-1986": {
      "id": "bank326-1986",
      "q": "你需要大模型输出“公式化、格式固定” 的答案，不希望因随机因素导致格式或内容风\n格频繁变化。为在此场景下控制大模型的输出“一致性”，以下哪种做法更合适？",
      "opts": [
        "调高temperature 并增大presence_penalty",
        "将temperature 调低并设置固定seed",
        "将temperature、top_k 调高",
        "将temperature、top_p 调高"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1071": {
      "id": "bank553-1071",
      "q": "你开发智能会议助手时遇到技术选型问题，“需要将会议录音转换为文字记录，并自动生成带有重点标注的摘要，最后将摘要内容转换为语音播报”。以下技术组合中最合理的是？",
      "opts": [
        "cosyvoice->v1语音合成->Qwen-VL视频理解->ComfyUI文生图",
        "语音转文本服务->文本生成模型->cosyvoice-v1语音合成",
        "MoviePy视频剪辑->文本生成模型->ComfyUI生成摘要图表",
        "Qwen-VL分析会议录像->MoviePy添加字幕->文本生成摘要"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1077": {
      "id": "bank553-1077",
      "q": "你开发了一个聊天机器人，用户反馈每次提问后总是要等很久才能看到回复，你应该怎么做？",
      "opts": [
        "在生成间隙通过前端界面展示动画，减少用户等待的疲惫感",
        "提醒用户输入尽量少的提示词",
        "降低temperature值",
        "来用流式输出"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1078": {
      "id": "bank553-1078",
      "q": "大模型如何判断什么时候应该停止输出？",
      "opts": [
        "需要用户手动打断",
        "只会在输出长度达到阈值时停止",
        "当模型检测到生成内容与输入主题无关时自动停止",
        "在输出长度达到阈值，或输出特殊Token（如，end of sentence，即“句子结束”标记）"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1081": {
      "id": "bank553-1081",
      "q": "大模型在处理输入文本时，第一步通常执行的操作是？",
      "opts": [
        "Token向量化",
        "对输入文本进行分词（Tokenize）",
        "计算候选Token概率",
        "计算Embedding后的向量"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1082": {
      "id": "bank553-1082",
      "q": "你在调用通义千问 API 时设置了 temperature（温度）参数，以下哪种说法是正确的？",
      "opts": [
        "A 温度参数越高，候选 Token的概率值会越接近，从而带来更高的随机性",
        "B 温度参数越高，候选 Token 的概率值之间的差距会变大，从而带来更高的随机性",
        "C 温度参数越高，低概率的候选 Token 有概率超过高概率的候选 Token的概率",
        "D 温度参数越高，越适合撰写技术报告、代码等有较高确定性需求的场景"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1084": {
      "id": "bank553-1084",
      "q": "你在为一个创意写作工具调整大模型生成内容，以下哪个参数可以用来控制生成内容的多样性？",
      "opts": [
        "temperature",
        "max_token",
        "stream",
        "api_key"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1098": {
      "id": "bank553-1098",
      "q": "测试时发现，RAG 应用的答案中仍包含大量无用细节，导致阅读困难。哪种做法可以最直接地减少无关细节？",
      "opts": [
        "在检索后用 ReRank 且设置更小的 Top N",
        "增大大模型的\"max_tokens\"",
        "把索引文件放进 Redis 数据库",
        "强制用户只提简单问题"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1107": {
      "id": "bank553-1107",
      "q": "以下哪项是流式输出的主要优势？",
      "opts": [
        "减少服务器计算资源消耗",
        "提升用户感知的响应速度",
        "降低模型推理错误率",
        "避免使用负载均衡"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1112": {
      "id": "bank553-1112",
      "q": "把API Key配置到环境变量里有哪些优点?",
      "opts": [
        "提高大模型的回复速度",
        "降低泄漏风险",
        "提高大模型的回复准确率",
        "在其它代码中也可以直接加载环境变量，无需记住又长又复杂的API Key"
      ],
      "ans": "BD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1129": {
      "id": "bank553-1129",
      "q": "在以下代码片段中，temperature=0.1的作用是什么？",
      "opts": [
        "使输出更具确定性",
        "使输出更具创造性",
        "增加输出的多样性",
        "减少输出的长度"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1132": {
      "id": "bank553-1132",
      "q": "在以下代码片段中，model=\"qwen-plus\"的作用是什么？",
      "opts": [
        "指定使用的模型",
        "增加输出的多样性",
        "使输出更具确定性",
        "控制输出长度"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1134": {
      "id": "bank553-1134",
      "q": "在控制大模型生成内容的随机性时，top_p参数的作用是什么？",
      "opts": [
        "调整候选Token的概率分布",
        "筛选出累计概率达到阈值的候选Token",
        "增加候选Token的数量",
        "减少候选Token的数量"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1145": {
      "id": "bank553-1145",
      "q": "在需要生成明确答案的场景中，建议如何设置temperature参数？",
      "opts": [
        "设置较高的温度值",
        "设置较低的温度值",
        "使用默认温度值",
        "随机设置温度值"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1148": {
      "id": "bank553-1148",
      "q": "在优化 answer correctness 指标时，以下哪种方法可以提升生成答案的准确度？",
      "opts": [
        "调整大模型生成的超参数（如 temperature）",
        "增加模型的训练数据",
        "减少模型的推理时间",
        "增加模型的参数数量"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1167": {
      "id": "bank553-1167",
      "q": "在大模型的问答工作流程中，哪个阶段会循环生成候选Token直到输出结束标记？",
      "opts": [
        "输入文本分词化",
        "Token向量化",
        "大模型推理",
        "输出Token"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1192": {
      "id": "bank553-1192",
      "q": "在top_p=0.5的设置下，大模型的输出会有什么特点?",
      "opts": [
        "输出内容非常多样化",
        "输出内容相对单一",
        "输出内容完全随机",
        "输出内容无法预测"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1208": {
      "id": "bank553-1208",
      "q": "在以下代码片段中，seed=42的作用是什么？",
      "opts": [
        "使输出可重现",
        "增加输出的多样性",
        "使输出更具确定性",
        "控制输出长度"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1216": {
      "id": "bank553-1216",
      "q": "在低温度（temperature=0.1）设置下，大模型的输出会有什么特点？",
      "opts": [
        "输出内容非常多样化",
        "输出内容相对单一",
        "输出内容完全随机",
        "输出内容无法预测"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1224": {
      "id": "bank553-1224",
      "q": "在以下代码片段中，max_tokens=512的作用是什么？",
      "opts": [
        "控制输出长度",
        "增加输出的多样性",
        "使输出更具确定性",
        "减少输出的重复性"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1247": {
      "id": "bank553-1247",
      "q": "在需要创意和多样化的场景中，建议如何设置temperature参数？",
      "opts": [
        "设置较高的温度值",
        "设置较低的温度值",
        "使用默认温度值",
        "随机设置温度值"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1252": {
      "id": "bank553-1252",
      "q": "在大模型的问答工作流程中，哪个阶段负责将句子分割成更小且具有独立语义的词语？",
      "opts": [
        "输入文本分词化",
        "Token向量化",
        "大模型推理",
        "输出Token"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1253": {
      "id": "bank553-1253",
      "q": "在以下代码片段中，model=\"qwen-turbo\"的作用是什么？",
      "opts": [
        "指定使用的模型",
        "指定使用的API密钥",
        "指定使用的标签类型",
        "指定使用的输出格式"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1282": {
      "id": "bank553-1282",
      "q": "在需要生成新闻初稿和代码的场景中，建议如何设置top_p参数？",
      "opts": [
        "设置较高的top_p值",
        "设置较低的top_p值",
        "使用默认top_p值",
        "随机设置top_p值"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1283": {
      "id": "bank553-1283",
      "q": "在控制大模型生成内容的随机性时，temperature参数的作用是什么？",
      "opts": [
        "调整候选Token的概率分布",
        "增加候选Token的数量",
        "减少候选Token的数量",
        "固定候选Token的顺序"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1284": {
      "id": "bank553-1284",
      "q": "为了控制生成内容的随机性，通常使用哪两个参数进行调整？",
      "opts": [
        "temperature和top_p",
        "learning_rate和dropout",
        "batch_size和epochs",
        "precision和recall"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1296": {
      "id": "bank553-1296",
      "q": "在高温度（temperature=1.2）设置下，大模型的输出会有什么特点？",
      "opts": [
        "输出内容非常多样化",
        "输出内容相对单一",
        "输出内容完全固定",
        "输出内容无法生成"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1328": {
      "id": "bank553-1328",
      "q": "在优化 answer correctness 指标时，以下哪些是调整大模型生成超参数（如 temperature）的好处？",
      "opts": [
        "提升生成答案的准确度",
        "增加模型的训练数据",
        "减少模型的推理时间",
        "增加模型的参数数量"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1331": {
      "id": "bank553-1331",
      "q": "在大模型的问答工作流程中，哪个阶段负责将Token转化为固定维度的向量?",
      "opts": [
        "输入文本分词化",
        "Token向量化",
        "大模型推理",
        "输出Token"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1340": {
      "id": "bank553-1340",
      "q": "在top_p=0.9的设置下，大模型的输出会有什么特点?",
      "opts": [
        "输出内容非常多样化",
        "输出内容相对单一",
        "输出内容完全固定",
        "输出内容无法生成"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1341": {
      "id": "bank553-1341",
      "q": "在大模型推理阶段，模型如何选择下一个输出的Token?",
      "opts": [
        "随机选择一个Token",
        "根据候选Token的概率进行选择",
        "选择第一个候选Token",
        "选择最后一个候选Token"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1352": {
      "id": "bank553-1352",
      "q": "在需要生成创意写作和诗歌的场景中，建议如何设置top_p参数？",
      "opts": [
        "设置较高的top_p值",
        "设置较低的top_p值",
        "使用默认top_p值",
        "随机设置top_p值"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1373": {
      "id": "bank553-1373",
      "q": "为了确保与通义千问大模型的交互更加个性化和连续性，下列哪项策略最不推荐？",
      "opts": [
        "在每次请求时都提供完整的对话历史",
        "利用上下文管理机制，只保留最近的几轮对话",
        "每次发送新问题时，都将前一次的问答结果清空",
        "设计算法自动摘要长对话，仅传入关键信息点以节省资源"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1377": {
      "id": "bank553-1377",
      "q": "下列关于利用列表给通义千问大模型增加记忆的描述中，哪一项是不正确的？",
      "opts": [
        "每次交互前，可以在列表中添加新的对话记录",
        "列表中存储的信息会随每次请求自动清除",
        "列表可以作为上下文连同新问题一起发送给模型",
        "这种方法可以帮助模型在回答问题时考虑之前的对话历史"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1417": {
      "id": "bank553-1417",
      "q": "大模型如通义千问API在自动处理文本任务时，主要优势在于：",
      "opts": [
        "需要大量人工预先编程每个细节",
        "能够理解并生成自然语言，适合处理大规模文本数据",
        "仅能处理简单的数学计算，无法进行复杂文本分析",
        "必须单独为每个任务训练模型"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1419": {
      "id": "bank553-1419",
      "q": "Qwen系列模型中，哪个模型代表了经过大规模数据预训练后的基础版本，未针对特定任务进行过多调整？",
      "opts": [
        "Qwen-7B-Chat",
        "Qwen-Max线上模型",
        "Qwen-7B预训练模型",
        "Qwen-14B-Chat"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1433": {
      "id": "bank553-1433",
      "q": "在使用通义千问 API 自动完成文本处理任务时，哪种方式能够批量处理上万个调查问卷？",
      "opts": [
        "手工处理",
        "Excel操作",
        "代码调用大模型",
        "人工智能训练模型"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1444": {
      "id": "bank553-1444",
      "q": "以下哪项不属于通义千问Qwen-VL-Max的能力?",
      "opts": [
        "识别图像中的物体并进行描述",
        "将图像中的数据图表转化为可编辑表格",
        "基于图像内容创作故事",
        "实时三维场景重建"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1448": {
      "id": "bank553-1448",
      "q": "自然语言处理(NLP)任务中，为什么需要对文本进行分词化？",
      "opts": [
        "A 分词化是为了加强文本加密，保证数据传输的安全性",
        "B 分词化可以精简文本内容，删除不必要的信息，减少存储空间",
        "C 分词化目的是为了改善文本的阅读性，使人们阅读更加流畅",
        "D 分词化使计算机能够理解和处理文本数据，转换成模型能够使用的数据结构"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1462": {
      "id": "bank553-1462",
      "q": "当你在工作中使用大语言模型(如: Qwen - Max)优化录音稿时, 应该优先考虑的目标是什么?",
      "opts": [
        "提高文本的口语化程度,便于录音和听众理解",
        "确保每个句子都保持原文的长度和复杂度",
        "尽量引用原始资料中的每个细节",
        "确保录音稿内容高度技术化,使用专业术语"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1468": {
      "id": "bank553-1468",
      "q": "以下哪个代码片段正确设置了百炼大语言模型的API Key?",
      "opts": [
        "client = OpenAl(base_url=\"https://dashscope.aliyuncs.com/compatible-mode/v1\")",
        "client = OpenAl(api_key=os.getenv(\"DASHSCOPE_API_KEY\"))",
        "client = OpenAl(base_url=\"https://dashscope.aliyuncs.com/compatible-mode/v1\", api_key=os.environ.get(\"DASHSCOPE_API_KEY\"))",
        "client = OpenAl(\"your_api_key\", \"https://dashscope.aliyuncs.com/compatible-mode/v1\")"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1480": {
      "id": "bank553-1480",
      "q": "通过LlamaIndex创建RAG应用时，编写了如下代码，这段代码中，如何修改召回文本段的个数？",
      "opts": [
        "from_documents[similarity_top_k] as_query_engine(similarity_top_k)",
        "query_engin",
        "query(similarity_top_k)",
        "streaming_respons",
        "print_response_stream(similarity_top_k)"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1488": {
      "id": "bank553-1488",
      "q": "在使用大语言模型 (如: Qwen - Turbo) 对课程内容进行初步翻译时，以下哪一项是必须的？",
      "opts": [
        "提供明确的系统消息和翻译任务提示",
        "将源文件转为图片格式",
        "使用固定的翻译模板",
        "手动输入所有需要翻译的文本"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1499": {
      "id": "bank553-1499",
      "q": "以下哪种方式不符合“Multi-Agent”的处理思想？",
      "opts": [
        "使用DashScope Parse解析文档结构,再使用通义千问API润色文本",
        "将文档的标题改写、表格单元格改写和语义分割都交给同一个大模型一次性完成",
        "使用规则引擎处理简单的文本格式转换,使用大模型处理复杂的语义理解任务",
        "根据不同的子任务需求,选择不同的模型类型和参数"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1500": {
      "id": "bank553-1500",
      "q": "在下列使用Qwen - Max辅助内容生产的场景中，以下哪个操作是可以执行的？",
      "opts": [
        "直接使用Qwen - Max进行图像设计",
        "利用Qwen - Max生成课程文案",
        "应用Qwen - Max进行视频剪辑",
        "让Qwen - Max执行编程代码"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1503": {
      "id": "bank553-1503",
      "q": "以下哪行代码能够正确调用百炼\"qwen-max\"模型进行对话补全？",
      "opts": [
        "completion = client.chat.create(model=\"qwen-max\", messages=[{\"role\": \"user\", \"content\": \"你好\"}])",
        "completion = client.chat.completions.create(model=\"qwen-max\", messages=[{\"role\": \"user\", \"content\": \"你好\"}])",
        "completion = client.chat.completions.create(model=\"qwen-max\", records=[{\"role\": \"user\", \"content\": \"你好\"}])",
        "completion = client.chat.create(model=\"qwen-max\", records=[{\"role\": \"user\", \"content\": \"你好\"}])"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1515": {
      "id": "bank553-1515",
      "q": "如果将调用大语言模型的参数temperature参数设置为0，模型的生成结果会有什么特点？",
      "opts": [
        "生成结果更加随机",
        "生成结果更加确定性,倾向于选择概率最高的词",
        "生成结果长度会变短",
        "生成结果长度会变长"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "bank553-1524": {
      "id": "bank553-1524",
      "q": "temperature参数如何影响候选Token的概率分布？",
      "opts": [
        "低温度增加高概率Token的选择",
        "高温度增加低概率Token的选择",
        "低温度减少高概率Token的选择",
        "高温度减少低概率Token的选择"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1525": {
      "id": "bank553-1525",
      "q": "以下关于temperature参数的描述，哪些是正确的？",
      "opts": [
        "温度值越低，输出结果越固定",
        "温度值越高，输出结果越多样化",
        "温度值不影响输出结果",
        "温度值只影响生成速度"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1527": {
      "id": "bank553-1527",
      "q": "在大模型的问答工作流程中，以下哪些阶段涉及模型的推理过程？",
      "opts": [
        "Token向量化",
        "大模型推理",
        "输出Token",
        "输出文本"
      ],
      "ans": "BC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1544": {
      "id": "bank553-1544",
      "q": "在以下代码片段中，哪些操作有助于生成更具确定性的文本？",
      "opts": [
        "降低temperature值",
        "减少max_tokens值",
        "降低presence_penalty值",
        "固定seed值"
      ],
      "ans": "AD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1549": {
      "id": "bank553-1549",
      "q": "为了控制生成内容的随机性，以下哪些参数可以进行调整？",
      "opts": [
        "temperature",
        "top_p",
        "learning_rate",
        "batch_size"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1556": {
      "id": "bank553-1556",
      "q": "以下关于top_p参数的描述，哪些是正确的？",
      "opts": [
        "top_p值越大，生成内容越多样化",
        "top_p值越小，生成内容越固定",
        "top_p值不影响生成内容",
        "top_p值只影响生成速度"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1564": {
      "id": "bank553-1564",
      "q": "在代码中，以下哪些是 index.as_query_engine 方法的参数？",
      "opts": [
        "streaming",
        "similarity_top_k",
        "llm",
        "api_key"
      ],
      "ans": "ABC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1577": {
      "id": "bank553-1577",
      "q": "在以下代码片段中，哪些参数可以影响生成文本的多样性？",
      "opts": [
        "temperature",
        "max_tokens",
        "presence_penalty",
        "seed"
      ],
      "ans": "AC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1579": {
      "id": "bank553-1579",
      "q": "在大模型的问答工作流程中，以下哪些阶段涉及Token的处理？",
      "opts": [
        "输入文本分词化",
        "Token向量化",
        "大模型推理",
        "输出Token"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1588": {
      "id": "bank553-1588",
      "q": "在以下代码片段中，哪些操作有助于生成更具创造性的文本？",
      "opts": [
        "提高temperature值",
        "增加max_tokens值",
        "提高presence_penalty值",
        "固定seed值"
      ],
      "ans": "ABC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1602": {
      "id": "bank553-1602",
      "q": "以下哪些场景适合设置较高的temperature值?",
      "opts": [
        "生成广告文案",
        "创作诗歌",
        "生成代码",
        "提取数据结构"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1604": {
      "id": "bank553-1604",
      "q": "top_p参数如何影响候选Token的筛选?",
      "opts": [
        "高top_p值增加候选Token的范围",
        "低top_p值减少候选Token的范围",
        "高top_p值减少候选Token的范围",
        "低top_p值增加候选Token的范围"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1610": {
      "id": "bank553-1610",
      "q": "在大模型的问答工作流程中，以下哪些阶段是必要的？",
      "opts": [
        "输入文本分词化",
        "Token向量化",
        "大模型推理",
        "输出Token"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1613": {
      "id": "bank553-1613",
      "q": "以下哪些场景适合设置较低的temperature值?",
      "opts": [
        "生成代码",
        "提取数据结构",
        "生成广告文案",
        "创作诗歌"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1614": {
      "id": "bank553-1614",
      "q": "在创建提问引擎时，以下哪些参数可以设置？",
      "opts": [
        "流式输出",
        "使用的模型",
        "API Key",
        "文本分段"
      ],
      "ans": "ABC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1617": {
      "id": "bank553-1617",
      "q": "在设置temperature参数时，以下哪些建议是合理的？",
      "opts": [
        "对于明确答案的场景，设置较低的温度值",
        "对于创意和多样化的场景，设置较高的温度值",
        "对于所有场景，使用默认温度值",
        "对于所有场景，随机设置温度值"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1624": {
      "id": "bank553-1624",
      "q": "在设置top_p参数时，以下哪些建议是合理的？",
      "opts": [
        "对于创意和多样化的场景，设置较高的top_p值",
        "对于明确和固定的场景，设置较低的top_p值",
        "对于所有场景，使用默认top_p值",
        "对于所有场景，随机设置top_p值"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1635": {
      "id": "bank553-1635",
      "q": "在大模型推理阶段，以下哪些因素会影响模型选择下一个输出的Token？",
      "opts": [
        "候选Token的概率",
        "输入文本的长度",
        "模型的训练数据",
        "输出文本的格式"
      ],
      "ans": "AC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1646": {
      "id": "bank553-1646",
      "q": "以下哪些描述符合使用列表方法给通义千问大模型增加记忆的场景？",
      "opts": [
        "在与模型的交互中，将关键信息以列表形式累积存储",
        "每次提问时，将该列表作为上下文附加到问题中，帮助模型理解历史对话",
        "列表中存储的信息会随每次请求自动清空，保证每次对话独立性",
        "可以手动编辑列表内容，选择性地向模型展示特定的记忆信息"
      ],
      "ans": "ABD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1650": {
      "id": "bank553-1650",
      "q": "为了有效利用上下文记忆提升通义千问大模型的交互质量，可以采取哪些策略？",
      "opts": [
        "设计高效的内存管理机制，自动丢弃较旧的对话记录",
        "根据对话内容的相关性选择性地更新记忆列表",
        "实现一个智能筛选机制，仅保留对当前对话有帮助的信息",
        "为每一次对话创建独立的记忆列表，不进行跨会话信息共享"
      ],
      "ans": "BC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1653": {
      "id": "bank553-1653",
      "q": "已知Qwen-7B预训练模型、Qwen-7B-Chat对话对齐微调模型和Qwen-Max线上模型，对比三者在处理特定领域问题时的能力，我们有可能遇到的问题是：",
      "opts": [
        "Qwen-7B由于缺乏特定领域知识的微调，可能在专业性回答上不如后两者",
        "Qwen-7B-Chat通过对话微调，能更好地理解并回应复杂对话场景，但可能在广度上不及Qwen-Max",
        "Qwen-Max作为线上模型，通常拥有更庞大的参数量和更广泛的训练数据，从而在泛化能力和某些特定任务上表现最优",
        "无论模型大小，只要经过足够的微调，所有模型都能达到相同水平的性能表现"
      ],
      "ans": "ABC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1655": {
      "id": "bank553-1655",
      "q": "以下选项中，百炼平台目前支持导入的数据格式有哪些？",
      "opts": [
        "pdf",
        "html",
        "docx",
        "csv"
      ],
      "ans": "AC",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1661": {
      "id": "bank553-1661",
      "q": "以下关于分词化的描述中，错误的是？",
      "opts": [
        "“分词化”就是将日常使用的一个个词语转换成计算机可以理解的数量向量形式",
        "分词化将文本数据转换成一系列的字节码，以便于存储和传输",
        "分词化将句子或文本字符串分解成更小的组成单元，如单词、短语或其他有意义的符号",
        "子词粒度(Subword-Level) 分词化是中文最直接的分词方法，它是以单个汉字为单位进行分词化"
      ],
      "ans": "ABD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1678": {
      "id": "bank553-1678",
      "q": "以下关于分词化的描述中，正确的是？",
      "opts": [
        "每个token会被直接用其对应的词汇字符串作为词表中的唯一标识，而不是映射为一个唯一的token id",
        "分词化是自然语言处理中的一个步骤，旨在将文本切分成更小的管理单元，称为token",
        "词粒度分词化适用于英语等西方语言，因为这些语言中的词通常由空格分隔",
        "在分词化过程结束后，每个token需要转换成一个数字id，这样才能被用于后续的计算机处理和分析"
      ],
      "ans": "BCD",
      "type": "multi",
      "chap": "2.1"
    },
    "bank553-1707": {
      "id": "bank553-1707",
      "q": "在qwen-plus对messages进行回答后，如果你想按照当前对话基础继续提问，需要怎么做？",
      "opts": [
        "对话历史跟着模型名称走,所以只要继续指定模型为qwen-plus就可以了",
        "将新的User Message添加到messages列表中",
        "大模型不支持多轮对话",
        "将大模型生成的Assistant Message添加到messages列表中"
      ],
      "ans": "BD",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-0": {
      "id": "ex0-0",
      "q": "在调用通义千问大模型时，将API Key存储在环境变量中的主要目的是？",
      "opts": [
        "方便在代码中引用",
        "提高API调用的速度",
        "增强API Key的安全性",
        "符合阿里云的规定"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-1": {
      "id": "ex0-1",
      "q": "以下哪些属于大模型在问答场景中的工作阶段？（ ）",
      "opts": [
        "输入文本分词化",
        "Token向量化",
        "模型训练",
        "输出文本"
      ],
      "ans": "ABD",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-10": {
      "id": "ex0-10",
      "q": "在调用通义千问大模型的代码中，若未正确设置API Key，会出现以下哪种情况？",
      "opts": [
        "代码无法运行",
        "模型返回错误的结果",
        "可能导致API Key泄露风险",
        "模型无法调用，提示认证失败"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-11": {
      "id": "ex0-11",
      "q": "以下关于检索增强式生成（RAG）的说法，正确的是？（ ）",
      "opts": [
        "RAG可以避免将整个参考文档作为背景信息输入而导致的问题",
        "RAG通过检索提取出与问题最相关的部分，从而提高大模型输出的准确性与相关性",
        "RAG应用分为建立索引阶段和检索与生成阶段",
        "在建立索引阶段，需要将私有知识文档或片段转换为可以高效检索的形式"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-12": {
      "id": "ex0-12",
      "q": "假设在一个对话问答场景中，希望大模型的输出更加稳定，减少随机性，且对创意要求不高，此时top_p参数应设置为？",
      "opts": [
        "0.9",
        "0.5",
        "0.001",
        "默认值0.8"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-13": {
      "id": "ex0-13",
      "q": "影响大模型内容生成随机性的参数有哪些？（ ）",
      "opts": [
        "temperature",
        "top_p",
        "top_k",
        "seed"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-14": {
      "id": "ex0-14",
      "q": "在使用通义千问大模型进行多轮对话时，关键在于？",
      "opts": [
        "每次提问时更换不同的API Key",
        "让模型参考历史对话信息进行回复",
        "不断调整temperature和top_p参数",
        "增加模型的训练次数"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-15": {
      "id": "ex0-15",
      "q": "以下代码中，load_key()函数的作用最可能是？\n```\nimport os\nfrom config.load_key import load_key\nload_key()\nprint(f'''你配置的 API Key 是：{os.environ[\"DASHSCOPE_API_KEY\"][:5]+\"*\"*5}''')\n```",
      "opts": [
        "从配置文件中加载API Key，并将其设置为环境变量",
        "生成一个新的API Key",
        "检查API Key的格式是否正确",
        "连接到阿里云大模型服务平台"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-16": {
      "id": "ex0-16",
      "q": "当大模型生成的内容出现与问题相关性不大的情况时，可能的原因有？（ ）",
      "opts": [
        "temperature值设置过高",
        "top_p值设置过大",
        "模型训练数据不足",
        "提示词引导不明确"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-17": {
      "id": "ex0-17",
      "q": "在利用大模型构建新人答疑机器人时，若公司的项目管理工具发生了变化，为了让答疑机器人能准确回答相关问题，最合理的做法是？",
      "opts": [
        "重新训练大模型",
        "在提问时更新私域知识相关的参考信息",
        "调整API调用的参数",
        "更换大模型"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-18": {
      "id": "ex0-18",
      "q": "关于大模型API调用，以下说法正确的是？（ ）",
      "opts": [
        "可以使用业界广泛采用的OpenAI Python SDK来调用通义千问大模型",
        "在使用API之前，需要前往阿里云大模型服务平台百炼开通模型调用服务并创建一个API Key",
        "直接在代码中写入API Key是安全的做法",
        "流式输出只是改变了内容的展示方式，模型的思考过程和最终答案的质量都保持不变"
      ],
      "ans": "ABD",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-19": {
      "id": "ex0-19",
      "q": "大模型在处理文本时，将“Hello, world!”分割成“Hello”“,”“world”“!”，这个过程属于大模型工作流程中的哪个阶段？",
      "opts": [
        "Token向量化",
        "大模型推理",
        "输入文本分词化",
        "输出Token"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-2": {
      "id": "ex0-2",
      "q": "当使用通义千问大模型生成代码时，为了使生成结果更稳定、准确，temperature参数应如何设置？",
      "opts": [
        "调高",
        "调低",
        "使用默认值",
        "与top_p同时调整"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-20": {
      "id": "ex0-20",
      "q": "在设置大模型生成内容的参数时，若希望模型在生成内容时优先选择概率最高的Token，以下哪种参数设置最合理？",
      "opts": [
        "temperature = 0，top_p = 0.001",
        "temperature = 2，top_p = 0.9",
        "temperature = 0.7，top_p = 0.8",
        "temperature = 1，top_p = 0.5"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-21": {
      "id": "ex0-21",
      "q": "以下哪些属于大模型的常见应用场景？（ ）",
      "opts": [
        "智能问答",
        "创意作画",
        "代码生成",
        "数据存储"
      ],
      "ans": "ABC",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-22": {
      "id": "ex0-22",
      "q": "当使用大模型进行创意写作时，为了获得更具多样性的内容，应该如何调整参数？",
      "opts": [
        "降低temperature值，增大top_p值",
        "增大temperature值，增大top_p值",
        "降低temperature值，降低top_p值",
        "增大temperature值，降低top_p值"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-23": {
      "id": "ex0-23",
      "q": "在构建基于大模型的答疑机器人时，发现机器人回答的内容总是很相似，缺乏变化，最有可能需要调整的参数是？",
      "opts": [
        "seed",
        "top_k",
        "temperature",
        "以上都不是"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-24": {
      "id": "ex0-24",
      "q": "关于在大模型应用中引入RAG方案的好处，下列说法正确的是？（ ）",
      "opts": [
        "可以扩展大模型所能处理的知识范围",
        "能够提高大模型输出的准确性与相关性",
        "可以减少模型训练的时间",
        "能降低模型训练的成本"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-25": {
      "id": "ex0-25",
      "q": "以下关于通义千问plus模型中top_k参数的说法，错误的是？",
      "opts": [
        "top_k是一种采样机制，从概率排名前k的Token中随机选择一个进行输出",
        "一般来说，top_k越大，生成内容越多样化",
        "当top_k设置为1时，模型仅选择概率最高的Token，输出会更加稳定且富有创意",
        "top_k与top_p有类似的能力，可用于控制大模型输出的随机性"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-26": {
      "id": "ex0-26",
      "q": "在利用大模型进行问答开发时，发现即使设置了相同的seed值，每次模型生成的结果仍不完全一致，原因可能是？",
      "opts": [
        "seed值设置错误",
        "大模型运行在分布式系统中，或模型输出引入了优化等复杂因素",
        "其他参数（如temperature、top_p）未设置正确",
        "模型本身存在缺陷"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-27": {
      "id": "ex0-27",
      "q": "在大模型的问答工作流程中，输出Token阶段，影响模型选择候选Token的因素有？（ ）",
      "opts": [
        "temperature参数",
        "top_p参数",
        "候选Token的概率分布",
        "输入文本的长度"
      ],
      "ans": "ABC",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-28": {
      "id": "ex0-28",
      "q": "在调用通义千问大模型时，若要开启模型利用互联网搜索结果来丰富回复内容的功能，需要设置的参数是？",
      "opts": [
        "enable_search",
        "stream",
        "model_type",
        "search_depth"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-29": {
      "id": "ex0-29",
      "q": "以下关于大模型在实际应用中的局限性及解决方案，说法正确的是？（ ）",
      "opts": [
        "大模型可能不了解特定公司的具体情况，导致回答不准确",
        "可以通过微调模型或在提问时传入相关参考信息来解决大模型回答私域知识问题的局限性",
        "大模型生成内容的随机性无法控制",
        "检索增强式生成（RAG）可以有效解决大模型处理大量私域知识时的问题\n答案：\n题号\n答案\n题号\n答案\n题号\n答案\n题号\n答案\n题号"
      ],
      "ans": "ABD",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-3": {
      "id": "ex0-3",
      "q": "关于top_p参数，以下说法正确的是？（ ）",
      "opts": [
        "top_p值越大，候选范围越广，内容更多样化",
        "top_p值越小，输出越稳定",
        "top_p是一种筛选机制，用于从候选Token集合中选出符合特定条件的“小集合”",
        "top_p取值范围为(0,1]，默认值为0.8"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-4": {
      "id": "ex0-4",
      "q": "以下代码片段中，能实现调用通义千问大模型进行流式输出的是？",
      "opts": [
        "```\nresponse = client.chat.completions.create(\n    model=\"qwen-plus-0919\",\n    messages=[\n        {\"role\": \"system\", \"content\": \"你负责教育内容开发公司的答疑，你的名字叫公司小蜜，你要回答同事们的问题。\"},\n        {\"role\": \"user\", \"content\": prompt}\n    ]\n)\nprint(response.choices[0].message.content)\n```",
        "```\nresponse = client.chat.completions.create(\n    model=\"qwen-plus-0919\",\n    messages=[\n        {\"role\": \"system\", \"content\": \"你负责教育内容开发公司的答疑，你的名字叫公司小蜜，你要回答同事们的问题。\"},\n        {\"role\": \"user\", \"content\": prompt}\n    ],\n    stream=True\n)\nfor chunk in response:\n    print(chunk.choices[0].delta.content, end=\"\")\n```",
        "```\nresponse = client.chat.completions.create(\n    model=\"qwen-plus-0919\",\n    messages=[\n        {\"role\": \"system\", \"content\": \"你负责教育内容开发公司的答疑，你的名字叫公司小蜜，你要回答同事们的问题。\"},\n        {\"role\": \"user\", \"content\": prompt}\n    ],\n    temperature=0\n)\nprint(response.choices[0].message.content)\n```",
        "```\nresponse = client.chat.completions.create(\n    model=\"qwen-plus-0919\",\n    messages=[\n        {\"role\": \"system\", \"content\": \"你负责教育内容开发公司的答疑，你的名字叫公司小蜜，你要回答同事们的问题。\"},\n        {\"role\": \"user\", \"content\": prompt}\n    ],\n    top_p=0.001\n)\nprint(response.choices[0].message.content)\n```"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-5": {
      "id": "ex0-5",
      "q": "大模型在推理过程中，无法准确回答公司内部特定项目管理工具的问题，原因是？",
      "opts": [
        "模型本身不具备回答此类问题的能力",
        "模型的训练数据中不包含相关知识",
        "提问方式不正确",
        "模型的输出被限制"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-6": {
      "id": "ex0-6",
      "q": "以下哪些是让大模型能够回答私域知识问题的方案？（ ）",
      "opts": [
        "在提问时，直接传入私域知识相关的参考信息",
        "通过微调甚至训练一个新的模型",
        "增加模型的训练数据量",
        "改变模型的推理算法"
      ],
      "ans": "AB",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-7": {
      "id": "ex0-7",
      "q": "在构建检索增强式生成（RAG）应用的建立索引阶段，将文件内容转化为多维向量的目的是？",
      "opts": [
        "方便存储文件内容",
        "提高文件的安全性",
        "便于进行相似度计算，实现高效检索",
        "减少文件存储空间"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "ex0-8": {
      "id": "ex0-8",
      "q": "关于大模型的工作原理，以下说法正确的是？（ ）",
      "opts": [
        "分词（Token）是大模型处理文本的基本单元，通常是词语、词组或者符号",
        "Token向量化会将每个Token转化为固定维度的向量，使其可以被计算机所理解",
        "大模型通过大量已有的训练数据来学习知识，结合所学知识进行推测",
        "大模型采用自回归的方法依次生成候选Token"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "ex0-9": {
      "id": "ex0-9",
      "q": "当大模型输出的内容过于随机，不符合预期时，以下哪种调整方式可能是正确的？",
      "opts": [
        "增大temperature值",
        "增大top_p值",
        "减小temperature值或top_p值",
        "同时增大temperature值和top_p值"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam1-325": {
      "id": "exam1-325",
      "q": "在调用通义千问时，将API Key存储在环境变量的主要目的是？（ ）",
      "opts": [
        "方便在代码中直接使用API Key",
        "提高API Key的使用效率",
        "增强API Key的安全性，避免泄露和方便修改",
        "符合行业标准规范"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam1-327": {
      "id": "exam1-327",
      "q": "当使用通义千问模型生成代码时，为保证生成内容稳定且准确，temperature参数应如何设置？（ ）",
      "opts": [
        "调高温度，设置在1.5 - 2之间",
        "使用默认温度",
        "调低温度，设置在0 - 0.3之间",
        "温度设置对生成代码无影响"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam1-329": {
      "id": "exam1-329",
      "q": "若想让大模型在生成内容时优先选择概率最高的Token，同时尽量保证输出稳定，top_p参数应设置为？（ ）",
      "opts": [
        "0.9",
        "0.5",
        "0.001",
        "1"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam1-330": {
      "id": "exam1-330",
      "q": "以下代码中，能实现通义千问模型流式输出的是？（ ）",
      "opts": [
        "```\nresponse = client.chat.completions.create(\n    model=\"qwen-plus-0919\",\n    messages=[\n        {\n              \"role\": \"system\", \"content\": \"你负责答疑\"},\n        {\n              \"role\": \"user\", \"content\": \"问题\"}\n    ]\n)\nprint(response.choices[0].message.content)\n```",
        "```\nresponse = client.chat.completions.create(\n    model=\"qwen-plus-0919\",\n    messages=[\n        {\n              \"role\": \"system\", \"content\": \"你负责答疑\"},\n        {\n              \"role\": \"user\", \"content\": \"问题\"}\n    ],\n    stream=True\n)\nfor chunk in response:\n    print(chunk.choices[0].delta.content, end=\"\")\n```",
        "```\nresponse = client.chat.completions.create(\n    model=\"qwen-plus-0919\",\n    messages=[\n        {\n              \"role\": \"system\", \"content\": \"你负责答疑\"},\n        {\n              \"role\": \"user\", \"content\": \"问题\"}\n    ],\n    temperature=0.5\n)\nprint(response.choices[0].message.content)\n```",
        "```\nresponse = client.chat.completions.create(\n    model=\"qwen-plus-0919\",\n    messages=[\n        {\n              \"role\": \"system\", \"content\": \"你负责答疑\"},\n        {\n              \"role\": \"user\", \"content\": \"问题\"}\n    ],\n    top_p=0.8\n)\nprint(response.choices[0].message.content)\n```"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam1-331": {
      "id": "exam1-331",
      "q": "在使用通义千问模型时，即使设置了相同的temperature、top_p和seed，生成结果仍可能不一致，原因不包括？（ ）",
      "opts": [
        "大模型运行在分布式系统中，设备差异引入微小随机性",
        "模型输出引入了优化，导致结果有细微变化",
        "通义千问模型本身不具备完全确定性的输出机制",
        "用户提问的表述存在微小差异"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "exam1-335": {
      "id": "exam1-335",
      "q": "假设在创建RAG应用时，不设置streaming=True，那么（ ）。",
      "opts": [
        "无法创建提问引擎",
        "不能使用qwen-plus-0919模型",
        "回复不会以流式输出",
        "索引无法保存到本地"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam1-356": {
      "id": "exam1-356",
      "q": "对于一个RAG应用，若其主要处理数学计算类问题，且对计算结果的准确性和稳定性要求较高，在选择大模型时，以下哪种大模型更合适？（ ）",
      "opts": [
        "qwen-turbo",
        "qwen-plus",
        "qwen-max",
        "面向特定领域训练的模型（如通义法睿）"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam1-358": {
      "id": "exam1-358",
      "q": "在对PDF文件进行解析转换为Markdown文本的过程中，借助百炼提供的DashScopeParse，若遇到解析后的Markdown文本存在格式问题，如PDF里的跨页表格行被解析为多行，可采取的措施是？（ ）",
      "opts": [
        "重新转换，多尝试几次",
        "使用大模型对生成的Markdown文本进行润色",
        "手动修改格式问题",
        "放弃使用该文件"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam1-395": {
      "id": "exam1-395",
      "q": "以下关于大模型工作原理的说法，正确的有（ ）。",
      "opts": [
        "大模型通过大量训练数据学习知识，其推理能力基于已有训练数据",
        "输入文本分词化时，Token只能是词语，不能是符号",
        "大模型输出内容的随机性完全由temperature参数控制，与其他参数无关",
        "自回归过程是利用输入文本和已生成文本的信息继续生成候选Token",
        "在问答工作流程中，输出文本阶段不需要考虑任何条件即可结束问答",
        "Token向量化的目的是将文本转化为计算机能理解的数字形式"
      ],
      "ans": "ADF",
      "type": "multi",
      "chap": "2.1"
    },
    "exam1-396": {
      "id": "exam1-396",
      "q": "在利用通义千问构建新人答疑机器人的过程中，遇到以下哪些情况可以通过调整temperature或top_p参数解决？（ ）",
      "opts": [
        "模型回答总是过于简短，无法提供足够信息",
        "模型回答内容与问题相关性低，经常跑题",
        "模型对不同问题的回答都很相似，缺乏针对性",
        "模型在回答问题时出现语法错误",
        "模型调用API时出现网络连接错误",
        "模型回答内容的多样性过高，不符合实际需求"
      ],
      "ans": "BCF",
      "type": "multi",
      "chap": "2.1"
    },
    "exam3-425": {
      "id": "exam3-425",
      "q": "关于在代码中处理API Key的安全做法，以下说法正确的是？（ ）",
      "opts": [
        "直接在代码中写入API Key",
        "将API Key存储在环境变量中",
        "在代码中明文编码API Key",
        "将API Key以注释形式写在代码里"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam3-427": {
      "id": "exam3-427",
      "q": "在大模型的问答工作流程中，将“Token进行数字化转换，使其可以被计算机所理解”这一操作属于哪个阶段？（ ）",
      "opts": [
        "输入文本分词化",
        "Token向量化",
        "大模型推理",
        "输出Token"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam3-428": {
      "id": "exam3-428",
      "q": "假设要让大模型生成一段富有创意的广告文案，应该如何调整temperature参数？（ ）",
      "opts": [
        "调低temperature值",
        "调高temperature值",
        "使用默认temperature值",
        "将temperature值设为0"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam3-429": {
      "id": "exam3-429",
      "q": "当使用top_p参数控制大模型候选Token集合的采样范围时，若top_p = 0.5，模型的选择倾向是？（ ）",
      "opts": [
        "优先选择最高概率的Token",
        "从所有Token中随机选择",
        "选择累计概率达到0.5的所有Token",
        "选择概率最低的Token"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "exam3-463": {
      "id": "exam3-463",
      "q": "在定义查询员工信息的工具函数query_employee_info时，使用DashScope模型的目的是（ ）。",
      "opts": [
        "模拟数据库查询过程",
        "将用户输入的自然语言问题转化为SQL语句",
        "从数据库中获取真实的员工信息",
        "规范工具函数的输出格式"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam3-481": {
      "id": "exam3-481",
      "q": "使用百炼平台部署模型时，若选择自定义模型，该模型是（ ）。",
      "opts": [
        "百炼支持的标准模型",
        "百炼平台调优后的模型",
        "用户从其他平台下载的模型",
        "百炼平台随机生成的模型"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam3-483": {
      "id": "exam3-483",
      "q": "当使用阿里云百炼平台开发与构建大模型应用时，为确保数据传输安全，以下说法错误的是？（ ）",
      "opts": [
        "百炼不会存储模型请求和响应数据",
        "Prompt在传输过程中严格加密",
        "只能通过公网访问百炼API",
        "可通过搭建VPC专网通道安全调用百炼API"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam3-495": {
      "id": "exam3-495",
      "q": "以下关于使用API调用通义千问大模型的代码分析，正确的有哪些？（ ）",
      "opts": [
        "使用OpenAI类创建客户端时，api_key需从环境变量获取，以保证安全",
        "client.chat.completions.create方法用于创建聊天完成请求，其中model参数指定使用的模型",
        "在实现流式输出时，只需添加stream = True参数，无需调整其他代码",
        "多轮对话实现时，需在每次提问时重新设置system角色的内容",
        "代码中messages列表里，role为system的消息用于设置大模型的角色和任务",
        "调用大模型的代码中，base_url参数不可修改，否则无法调用模型"
      ],
      "ans": "ABE",
      "type": "multi",
      "chap": "2.1"
    },
    "exam3-496": {
      "id": "exam3-496",
      "q": "小明在开发一个基于大模型的智能客服应用，在应用实践过程中遇到以下问题，对应解决方案正确的有？（ ）",
      "opts": [
        "问题：大模型回答内容总是重复。解决方案：提高temperature值，增加输出多样性",
        "问题：大模型回答涉及公司内部敏感信息。解决方案：对大模型进行微调，去除敏感信息",
        "问题：大模型回答速度慢，影响用户体验。解决方案：采用流式输出优化",
        "问题：大模型对特定领域专业问题回答不准确。解决方案：通过提示词传递专业知识",
        "问题：大模型输出内容格式混乱。解决方案：调整top_p参数，控制输出的稳定性",
        "问题：大模型无法理解一些生僻词汇。解决方案：重新训练大模型，增加词汇量"
      ],
      "ans": "ACD",
      "type": "multi",
      "chap": "2.1"
    },
    "exam3-497": {
      "id": "exam3-497",
      "q": "关于大模型工作原理及应用实践中的参数设置，以下说法正确的有？（ ）",
      "opts": [
        "temperature参数取值范围越大，生成内容越稳定",
        "top_p值越小，模型输出越倾向于选择概率最高的Token",
        "同时调整temperature和top_p参数，一定能提高模型生成内容的质量",
        "为确保生成内容的可控性，建议优先调整temperature或top_p其中一个参数",
        "seed参数可完全保证同一问题模型生成结果完全一致",
        "top_k参数从概率排名前k的Token中随机选择一个进行输出，top_k越大，生成内容越多样化"
      ],
      "ans": "BDF",
      "type": "multi",
      "chap": "2.1"
    },
    "exam3-499": {
      "id": "exam3-499",
      "q": "关于RAG应用中的多轮对话，以下说法正确的是（ ）",
      "opts": [
        "直接将用户输入与文本段进行相似度比较不会丢失历史对话信息",
        "业界常用方法是通过大模型基于历史对话信息改写用户问题",
        "LlamaIndex提供的工具可快速实现RAG应用的多轮对话",
        "将完整历史对话与问题都输入到检索系统不会有任何问题",
        "多轮对话的实现与直接向大模型发起多轮对话机制完全相同",
        "在多轮对话检索时，新的query需包含历史对话的关键信息"
      ],
      "ans": "BCF",
      "type": "multi",
      "chap": "2.1"
    },
    "exam4-525": {
      "id": "exam4-525",
      "q": "以下关于调用通义千问时设置API Key的说法，正确的是（ ）",
      "opts": [
        "直接在代码中写入API Key是最便捷安全的方式",
        "将API Key存储在环境变量中，分享代码时不易泄露密钥",
        "代码中无需设置API Key也能调用通义千问",
        "调用通义千问不需要API Key"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam4-526": {
      "id": "exam4-526",
      "q": "在使用OpenAI Python SDK调用通义千问大模型时，若要实现流式输出，关键是（ ）",
      "opts": [
        "设置model参数为\"qwen-plus-0919\"",
        "在messages列表中正确设置system和user角色",
        "添加stream=True参数并调整输出方式",
        "调整temperature和top_p参数"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam4-527": {
      "id": "exam4-527",
      "q": "当使用大模型进行问答时，输入文本“ACP is a very”，大模型首先进行的操作是（ ）",
      "opts": [
        "Token向量化",
        "输入文本分词化",
        "大模型推理",
        "输出Token"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam4-528": {
      "id": "exam4-528",
      "q": "假设使用通义千问plus模型生成代码，为保证输出稳定，temperature参数应（ ）",
      "opts": [
        "调高",
        "调低",
        "使用默认值",
        "设置为2"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam4-529": {
      "id": "exam4-529",
      "q": "若想让大模型在生成内容时，从概率排名前k的Token中随机选择一个进行输出，应设置的参数是（ ）",
      "opts": [
        "temperature",
        "top_p",
        "top_k",
        "seed"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam4-558": {
      "id": "exam4-558",
      "q": "在RAG应用的生成答案阶段，若希望大模型在回答用户问题时不要总是用重复的句子，应该调整以下哪个参数？（ ）",
      "opts": [
        "temperature",
        "max_tokens",
        "presence_penalty",
        "seed"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam4-560": {
      "id": "exam4-560",
      "q": "在构建查询员工信息的工具函数query_employee_info时，使用DashScope模型生成SQL语句的过程中，若模型输出的SQL语句不是预期的格式（如包含多余的文本），最可能的原因是（ ）",
      "opts": [
        "DashScope模型本身存在故障",
        "ChatMessage中SYSTEM角色的提示内容设置不当",
        "网络不稳定导致数据传输错误",
        "模拟查询部分的代码逻辑错误"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam4-595": {
      "id": "exam4-595",
      "q": "以下关于通过API调用通义千问的说法，正确的有（ ）",
      "opts": [
        "可以使用OpenAI Python SDK来调用通义千问大模型",
        "调用前需前往阿里云大模型服务平台百炼开通模型调用服务并创建API Key",
        "直接在代码中写入API Key不会有安全风险",
        "流式输出会改变模型最终答案的质量",
        "实现多轮对话需要参考特定的代码示例",
        "调用通义千问时，base_url固定为https://dashscope.aliyuncs.com/compatible-mode/v1"
      ],
      "ans": "ABE",
      "type": "multi",
      "chap": "2.1"
    },
    "exam4-596": {
      "id": "exam4-596",
      "q": "关于大模型的问答工作流程，下列说法正确的是（ ）",
      "opts": [
        "输入文本分词化是将句子分割成具有独立语义的词语（Token）并分配ID",
        "Token向量化是为了让计算机能够理解Token的含义",
        "大模型推理是结合所学知识对输入内容进行推测，计算所有可能Token的概率",
        "输出Token的过程中，不会出现相同问题回答不同的情况",
        "输出文本是循环大模型推理和输出Token的过程，直到满足结束条件",
        "分词（Token）只能是词语，不能是词组或符号"
      ],
      "ans": "ABCE",
      "type": "multi",
      "chap": "2.1"
    },
    "exam4-597": {
      "id": "exam4-597",
      "q": "在大模型应用中，影响内容生成随机性的参数有（ ）",
      "opts": [
        "temperature，值越高生成内容越具多样性",
        "top_p，值越大候选范围越窄，输出越稳定",
        "top_k，值越大生成内容越多样化",
        "seed，每次传入相同seed值并保持其他参数不变，模型输出结果完全一致",
        "temperature和top_p不能同时调整，否则输出结果不可预测",
        "top_p是按概率从低到高排序选取Token组成新的候选集合"
      ],
      "ans": "ACE",
      "type": "multi",
      "chap": "2.1"
    },
    "exam4-609": {
      "id": "exam4-609",
      "q": "在RAG应用的生成答案阶段，为了解决可能出现的问题，可以采取的措施有（ ）。",
      "opts": [
        "选择合适的大模型，如简单信息查询用小参数量模型，复杂推理用大参数量模型",
        "充分优化提示词模板，明确要求不编造答案、添加内容分隔标记、根据问题类型调整模板",
        "调整大模型的参数，如seed、presence_penalty、temperature、max_tokens等",
        "调优大模型，针对特定场景进行优化",
        "增加检索召回的文档切片数量",
        "更换向量数据库"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "exam4-619": {
      "id": "exam4-619",
      "q": "在大模型应用的性能优化中，减少Tokens的输入和输出可以加快响应速度，以下属于输入端优化的方法有（ ）",
      "opts": [
        "精简输入内容，去除输入中的冗余信息或无关内容",
        "对长文档或复杂输入内容生成摘要，作为模型的输入",
        "通过提示词明确要求模型生成简洁的回答",
        "在通过API调用模型时，明确指定最大输出长度（max_tokens参数）",
        "从图片中提取文本并进行预处理",
        "去除输入中的停用词"
      ],
      "ans": "ABF",
      "type": "multi",
      "chap": "2.1"
    },
    "exam5-625": {
      "id": "exam5-625",
      "q": "在使用API调用通义千问时，将API Key存储在环境变量中的主要目的是（ ）。",
      "opts": [
        "方便在代码中直接调用",
        "提高API调用的速度",
        "增强API Key的安全性",
        "减少代码编写量"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam5-626": {
      "id": "exam5-626",
      "q": "以下关于大模型问答工作流程中分词化阶段的描述，正确的是（ ）。",
      "opts": [
        "分词是将文本分割成任意长度的片段",
        "Token只能是单个词语",
        "分词后无需为每个Token分配ID",
        "Token是大模型处理文本的基本单元"
      ],
      "ans": "D",
      "type": "single",
      "chap": "2.1"
    },
    "exam5-629": {
      "id": "exam5-629",
      "q": "以下代码中，能实现通义千问大模型流式输出的是（ ）。",
      "opts": [
        "response = client.chat.completions.create(model=“qwen-plus-0919”, messages=[{“role”: “system”, “content”: “你负责答疑”},{“role”: “user”, “content”: “问题内容”}])",
        "response = client.chat.completions.create(model=“qwen-plus-0919”, messages=[{“role”: “system”, “content”: “你负责答疑”},{“role”: “user”, “content”: “问题内容”}], stream=True)",
        "response = client.chat.completions.create(model=“qwen-plus-0919”, messages=[{“role”: “system”, “content”: “你负责答疑”},{“role”: “user”, “content”: “问题内容”}], temperature=0)",
        "response = client.chat.completions.create(model=“qwen-plus-0919”, messages=[{“role”: “system”, “content”: “你负责答疑”},{“role”: “user”, “content”: “问题内容”}], top_p=0.5)"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam5-630": {
      "id": "exam5-630",
      "q": "在大模型的Token向量化阶段，其主要目的是（ ）。",
      "opts": [
        "为了让大模型更好地理解文本含义",
        "将文本转换为更短的形式",
        "把Token转化为固定维度的向量，便于计算机理解",
        "增加Token的数量"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam5-631": {
      "id": "exam5-631",
      "q": "当使用通义千问大模型为一款智能音箱撰写广告文案时，为了使文案更具创意，top_p参数应（ ）。",
      "opts": [
        "设置为极小值，如0.0001",
        "设置为默认值0.8",
        "设置为较大值，如0.9",
        "设置为0"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "exam5-658": {
      "id": "exam5-658",
      "q": "在RAG应用的生成答案阶段，若希望大模型在回答用户问题时不要总是用重复的句子，应该调整的参数是（ ）。",
      "opts": [
        "temperature",
        "presence_penalty",
        "max_tokens",
        "seed"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam5-674": {
      "id": "exam5-674",
      "q": "在使用vLLM部署模型时，若指定加载模型的格式为“safetensors”，并设置端口号为8100，以下正确的启动命令是（ ）",
      "opts": [
        "vllm serve “./model/qwen2_5-1_5b-instruct” --load-format “safetensors” --port 8100",
        "vllm “./model/qwen2_5-1_5b-instruct” --load-format “safetensors” --port 8100",
        "serve vllm “./model/qwen2_5-1_5b-instruct” --load-format “safetensors” --port 8100",
        "vllm serve “./model/qwen2_5-1_5b-instruct” --format “safetensors” --port 8100"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "exam5-675": {
      "id": "exam5-675",
      "q": "当使用直接调用服务提供商（如阿里云）完全托管的API服务时，出现请求失败的情况，可能的原因是（ ）",
      "opts": [
        "模型服务提供商服务器故障",
        "超出每分钟调用次数（QPM）或消耗的Token数（TPM）限制",
        "本地网络连接不稳定",
        "调用API时参数设置错误"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "exam5-676": {
      "id": "exam5-676",
      "q": "若要在测试环境中部署微调后的Qwen2.5-1.5B-Instruct模型，且微调模型路径为“./output/qwen2_5-1_5b-instruct/v0-202308-1234/checkpoint-100-merged”，为避免端口占用，选择8002端口，正确的vllm启动命令是（ ）",
      "opts": [
        "vllm serve “./output/qwen2_5-1_5b-instruct/v0-202308-1234/checkpoint-100-merged” --load-format “safetensors” --port 8002",
        "vllm serve “./output/qwen2_5-1_5b-instruct/v0-202308-1234/checkpoint-100-merged” --port 8002",
        "vllm serve “./model/qwen2_5-1_5b-instruct” --load-format “safetensors” --port 8002",
        "vllm serve “./output/qwen2_5-1_5b-instruct/v0-202308-1234/checkpoint-100-merged” --load-format “safetensors”"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "exam5-696": {
      "id": "exam5-696",
      "q": "在调整大模型生成内容的随机性和多样性时，涉及到的参数有（ ）。",
      "opts": [
        "temperature",
        "top_p",
        "top_k",
        "seed",
        "enable_search",
        "reasoning_content"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "exam5-719": {
      "id": "exam5-719",
      "q": "以下哪些属于提升大模型应用用户体验的方法？（ ）",
      "opts": [
        "流式输出",
        "分块处理",
        "展示任务进度",
        "完善错误处理机制",
        "提供用户反馈入口与持续改进",
        "减少模型处理请求数和运算量"
      ],
      "ans": "ABCDE",
      "type": "multi",
      "chap": "2.1"
    },
    "moni001-728": {
      "id": "moni001-728",
      "q": "以下关于大模型 “上下文窗口” 的描述，正确的是？",
      "opts": [
        "上下文窗口越大，模型的推理速度越快",
        "上下文窗口的大小决定了模型能处理的最大输入文本长度",
        "所有大模型的上下文窗口大小都是固定不可调整的",
        "上下文窗口仅影响模型的文本生成能力，不影响理解能力"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni001-730": {
      "id": "moni001-730",
      "q": "在大模型多轮对话应用开发中，为避免模型遗忘前文信息，以下哪种做法最有效？",
      "opts": [
        "每轮对话仅向模型输入当前用户问题",
        "将历史对话记录与当前问题一起作为输入传递给模型",
        "要求模型每轮对话后总结前文要点并保存",
        "减少每轮对话的输出文本长度"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni001-736": {
      "id": "moni001-736",
      "q": "某开发者使用阿里云通义千问 API 开发应用，需控制每次 API 调用的成本。以下哪种措施最有效？",
      "opts": [
        "增加每次请求的文本输入长度",
        "选用更高精度的模型版本",
        "合理设置 “max_tokens” 参数，限制输出文本长度",
        "提高 API 调用的并发量"
      ],
      "ans": "C",
      "type": "single",
      "chap": "2.1"
    },
    "moni001-750": {
      "id": "moni001-750",
      "q": "开发者在调用阿里云大模型 API 时，返回 “Token 超出限制” 的错误。以下哪种解决措施最直接？",
      "opts": [
        "更换更大参数的模型",
        "减少输入文本的长度，或拆分输入内容为多次调用",
        "增加 API 调用的并发数",
        "延长 API 调用的超时时间"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni001-758": {
      "id": "moni001-758",
      "q": "某开发者开发大模型多轮对话应用，用户连续提问：“推荐一款性价比高的笔记本电脑”→“它的内存是多大？”。模型无法理解 “它” 指代 “推荐的笔记本电脑”。以下哪种优化措施最有效？",
      "opts": [
        "要求用户每次提问都重复提及 “笔记本电脑”",
        "在每次对话中，将历史对话中的核心实体（如 “推荐的笔记本电脑”）标注并传入模型",
        "更换参数更大的模型",
        "限制用户的提问长度"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni001-761": {
      "id": "moni001-761",
      "q": "开发者在调用大模型 API 时，希望控制模型生成内容的 “创新性”，避免生成过于保守或过于夸张的内容。以下哪种 API 参数最适配？",
      "opts": [
        "max_tokens（最大输出长度）",
        "temperature（温度参数）",
        "top_p（核采样参数）",
        "stop（停止词）"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni001-770": {
      "id": "moni001-770",
      "q": "关于大模型 “流式输出（Streaming Output）” 的描述，正确的是？",
      "opts": [
        "流式输出能减少模型的总生成时间",
        "流式输出将生成结果按 token 逐段返回，提升用户实时体验",
        "流式输出仅支持文本生成，不支持其他任务",
        "所有大模型 API 都默认开启流式输出"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni001-778": {
      "id": "moni001-778",
      "q": "某公司开发大模型多轮对话客服系统，需解决 “模型遗忘前文信息、对话逻辑不连贯” 的问题。以下哪些优化措施有效？（多选，4 个选项）",
      "opts": [
        "每次对话时，将历史对话记录与当前问题一起传入模型",
        "对历史对话进行摘要压缩，保留核心信息（如用户需求、已解决问题）",
        "限制对话轮次，超过 10 轮后强制结束对话",
        "使用会话状态管理工具，存储用户画像与对话关键实体"
      ],
      "ans": "ABD",
      "type": "multi",
      "chap": "2.1"
    },
    "moni001-780": {
      "id": "moni001-780",
      "q": "某开发者调用阿里云大模型 API 时，遇到 “API 调用失败” 的问题。以下哪些排查方向是合理的？（多选，4 个选项）",
      "opts": [
        "检查 API 密钥是否正确，是否存在过期或权限不足",
        "检查请求参数是否符合要求（如 Token 数量、格式）",
        "检查网络连接是否正常，是否能访问阿里云 API 服务地址",
        "检查模型是否处于维护状态，是否有服务中断通知"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "moni002-801": {
      "id": "moni002-801",
      "q": "关于大模型 “流式输出（Streaming Output）” 的描述，正确的是？",
      "opts": [
        "流式输出能减少模型的总生成时间（如原本 10 秒生成，流式输出可缩短至 5 秒）",
        "流式输出将生成结果按 Token 逐段返回（如先返回开头句子，再返回后续内容），提升用户实时体验（避免用户等待全量输出）",
        "流式输出仅支持文本生成任务，不支持其他任务（如文本分类、信息抽取）",
        "所有阿里云大模型 API 都默认开启流式输出功能，无需额外配置"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni002-808": {
      "id": "moni002-808",
      "q": "关于阿里云大模型 API 的 “参数调优”，以下哪些参数调整可影响模型的输出效果？（多选，4 个选项，2-4 个正确）",
      "opts": [
        "max_tokens：控制模型生成文本的最大长度",
        "temperature：控制生成内容的随机性（创新性）",
        "top_p：控制生成时选择词汇的范围（如 top_p=0.9 表示仅从概率前 90% 的词汇中选择）",
        "stop：设置生成终止词（如遇到 “END” 时停止生成）"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "moni002-809": {
      "id": "moni002-809",
      "q": "某公司开发大模型多轮对话应用时，出现 “模型遗忘前文对话信息” 的问题（如用户先问 “推荐手机”，再问 “它的价格”，模型无法理解 “它” 指代手机）。以下哪些解决方案有效？（多选，4 个选项，2-4 个正确）",
      "opts": [
        "将历史对话记录与当前问题一起作为输入传递给模型（如 “历史：用户问推荐手机；当前：它的价格是多少？”）",
        "采用实体标注提示，在历史对话中标记核心实体（如 “[实体：推荐的手机，品牌：华为，型号：Mate 60]”）",
        "增加模型的上下文窗口大小（如从 4096Token 扩展到 8192Token），确保历史对话能被完整输入",
        "每轮对话后让模型总结前文要点，将总结结果作为下一轮输入的一部分"
      ],
      "ans": "ABCD",
      "type": "multi",
      "chap": "2.1"
    },
    "moni002-814": {
      "id": "moni002-814",
      "q": "开发者在调用阿里云大模型 API 时，需控制调用成本。以下哪些措施有效？（多选，4 个选项，2-4 个正确）",
      "opts": [
        "合理设置 max_tokens 参数，限制输出文本长度（如生成商品标题时设为 50Token 以内）",
        "选择与任务匹配的轻量模型（如文本分类任务选择通义千问 - 轻量版，而非旗舰版）",
        "对输入文本进行精简，去除冗余内容（如调用模型总结文档时，先提取文档核心段落再输入）",
        "提高 API 调用并发量，增加单位时间内的调用次数"
      ],
      "ans": "ABC",
      "type": "multi",
      "chap": "2.1"
    },
    "moni002-824": {
      "id": "moni002-824",
      "q": "开发者在调用大模型 API 时，需提升响应速度。以下哪些措施有效？（多选，4 个选项，2-4 个正确）",
      "opts": [
        "启用流式输出（Streaming），按 Token 分段返回结果",
        "选择轻量模型（如通义千问 - 1.8B）替代大参数模型（如通义千问 - 70B）",
        "对输入文本进行精简，去除冗余内容（如删除与问题无关的背景描述）",
        "增加 API 调用的超时时间（如从 3 秒延长至 10 秒）"
      ],
      "ans": "ABC",
      "type": "multi",
      "chap": "2.1"
    },
    "moni003-850": {
      "id": "moni003-850",
      "q": "在开发一个多轮对话系统时，希望模型能够记住并在后续对话中引用之前讨论过的关键信息。以下哪种方法通常用于实现这种上下文记忆能力？",
      "opts": [
        "要求用户在每轮对话中重复重要信息",
        "将整个对话历史（或其摘要）作为后续对话轮次的输入上下文",
        "只将最新的用户查询输入给模型",
        "训练一个独立的模型来专门记忆信息"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni003-855": {
      "id": "moni003-855",
      "q": "为了提高大模型在处理长文档时的效率并降低计算成本，以下哪种方法通常被采用？",
      "opts": [
        "要求用户将长文档拆分成多个短段落分别提交",
        "使用滑动窗口注意力等机制来减少计算复杂度",
        "增加模型的层数和参数量以提升处理能力",
        "只处理文档的开头和结尾部分"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni004-913": {
      "id": "moni004-913",
      "q": "在开发创意写作应用时，希望模型能够生成更加新颖的内容。以下哪种参数设置最合适？",
      "opts": [
        "低温度(low temperature)",
        "高温度(high temperature)",
        "顶层P(top-p)为0.1",
        "重复惩罚为0"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni004-924": {
      "id": "moni004-924",
      "q": "某智能写作助手需要避免生成重复内容。以下哪种参数设置最有帮助？",
      "opts": [
        "高重复惩罚(high repetition penalty)",
        "低温度(low temperature)",
        "高顶层P(high top-p)",
        "增加生成长度"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "moni004-930": {
      "id": "moni004-930",
      "q": "某内容生成系统需要确保输出内容的多样性。以下哪种参数配置最合适？",
      "opts": [
        "temperature=0.1, top-p=0.9",
        "temperature=0.7, top-p=0.9",
        "temperature=0.1, top-p=0.1",
        "temperature=0.9, top-p=0.1"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni004-932": {
      "id": "moni004-932",
      "q": "某智能客服需要处理多轮对话并保持上下文连贯。以下哪种技术最关键？",
      "opts": [
        "对话状态跟踪",
        "每次对话独立处理",
        "要求用户重复信息",
        "使用短上下文模型"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "moni005-1047": {
      "id": "moni005-1047",
      "q": "当大模型应用需要处理实时流式数据时，以下哪些技术考虑是重要的？（ ）",
      "opts": [
        "支持流式响应，逐步输出结果",
        "处理长时间运行的对话会话",
        "管理上下文窗口，避免历史信息过多",
        "实现低延迟的推理优化",
        "保证会话状态的一致性"
      ],
      "ans": "ABCDE",
      "type": "multi",
      "chap": "2.1"
    },
    "moni005-990": {
      "id": "moni005-990",
      "q": "在构建一个对话系统时，你希望模型能记住较长的对话历史。以下哪种方法最直接有效？",
      "opts": [
        "每次都将完整的对话历史作为上下文输入模型",
        "只输入最后一条用户消息",
        "训练一个更大的模型",
        "使用一个外部数据库来存储和检索相关对话历史"
      ],
      "ans": "A",
      "type": "single",
      "chap": "2.1"
    },
    "moni005-991": {
      "id": "moni005-991",
      "q": "对于创意写作任务（如写诗、写故事），为了增加输出的多样性和新颖性，通常可以调整以下哪个生成参数？",
      "opts": [
        "降低温度（temperature）",
        "提高温度（temperature）",
        "使用贪婪解码（Greedy Decoding）",
        "设置Top-p (nucleus sampling)为0"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni006-1050": {
      "id": "moni006-1050",
      "q": "分词（Tokenization）的主要作用是什么？",
      "opts": [
        "将文本转换为固定长度的向量",
        "将输入文本分割成单词、子词或字符等更小的语义单元",
        "提取文本的语义特征以计算情感值",
        "为模型提供上下文信息"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni006-1059": {
      "id": "moni006-1059",
      "q": "你开发智能会议助手时遇到技术选型问题，\"需要将会议录音转换为文字记录，并自动生成带有重点标注的摘要，最后将摘要内容转换为语音播报\"。以下技术组合中最合理的是？",
      "opts": [
        "cosyvoice-v1语音合成 → Qwen-VL视频理解 → ComfyUI文生图",
        "语音转文本服务→ 文本生成模型 → cosyvoice-v1语音合成",
        "MoviePy视频剪辑 → 文本生成模型 → ComfyUI生成摘要图表",
        "Qwen-VL分析会议录像 → MoviePy添加字幕 → 文本生成摘要"
      ],
      "ans": "B",
      "type": "single",
      "chap": "2.1"
    },
    "moni006-1064": {
      "id": "moni006-1064",
      "q": "关于大模型的工作流程，以下哪三个描述是正确的？",
      "opts": [
        "输入文本需要先分词化为 Token",
        "只要每次输入的问题一样，每次输出的Token也会一样",
        "大模型推理阶段会根据候选 Token 的概率选择输出内容",
        "Token 向量化是为了让计算机能够理解自然语言"
      ],
      "ans": "ACD",
      "type": "multi",
      "chap": "2.1"
    }
  },
  "store": {
    "records": {
      "ex0-0": {
        "my": "A",
        "ok": false,
        "ts": 1789457526004
      },
      "ex0-1": {
        "my": "ABD",
        "ok": true,
        "ts": 1789457537349
      },
      "ex0-2": {
        "my": "B",
        "ok": true,
        "ts": 1789457930303
      },
      "ex0-3": {
        "my": "ABC",
        "ok": false,
        "ts": 1789457963379
      },
      "ex0-4": {
        "my": "B",
        "ok": true,
        "ts": 1789457981274
      },
      "ex0-5": {
        "my": "B",
        "ok": true,
        "ts": 1789458433550
      },
      "ex0-6": {
        "my": "AB",
        "ok": true,
        "ts": 1789458452495
      },
      "ex0-7": {
        "my": "C",
        "ok": true,
        "ts": 1789458462151
      },
      "ex0-8": {
        "my": "ABCD",
        "ok": true,
        "ts": 1789461331455
      },
      "ex0-9": {
        "my": "C",
        "ok": true,
        "ts": 1789461343403
      },
      "ex0-10": {
        "my": "D",
        "ok": true,
        "ts": 1789461348893
      },
      "ex0-11": {
        "my": "ABCD",
        "ok": true,
        "ts": 1789461381175
      },
      "ex0-12": {
        "my": "C",
        "ok": true,
        "ts": 1789461391793
      },
      "ex0-13": {
        "my": "ABC",
        "ok": false,
        "ts": 1789461402487
      },
      "ex0-14": {
        "my": "B",
        "ok": true,
        "ts": 1789535303988
      },
      "ex0-15": {
        "my": "A",
        "ok": true,
        "ts": 1789535325683
      },
      "ex0-16": {
        "my": "ACD",
        "ok": false,
        "ts": 1789535656722
      },
      "ex0-17": {
        "my": "B",
        "ok": true,
        "ts": 1789535890418
      },
      "ex0-18": {
        "my": "ABD",
        "ok": true,
        "ts": 1789535912904
      },
      "ex0-19": {
        "my": "C",
        "ok": true,
        "ts": 1789535918630
      },
      "ex0-20": {
        "my": "A",
        "ok": true,
        "ts": 1789535947302
      },
      "ex0-21": {
        "my": "ABC",
        "ok": true,
        "ts": 1789535966447
      },
      "ex0-22": {
        "my": "B",
        "ok": true,
        "ts": 1789535979235
      },
      "ex0-23": {
        "my": "C",
        "ok": true,
        "ts": 1789535989680
      },
      "ex0-24": {
        "my": "AB",
        "ok": true,
        "ts": 1789536170059
      },
      "ex0-25": {
        "my": "C",
        "ok": true,
        "ts": 1789536211690
      },
      "ex0-26": {
        "my": "C",
        "ok": false,
        "ts": 1789536367402
      },
      "ex0-27": {
        "my": "ABC",
        "ok": true,
        "ts": 1789536977927
      },
      "ex0-28": {
        "my": "A",
        "ok": true,
        "ts": 1789536987040
      },
      "ex0-29": {
        "my": "ABD",
        "ok": true,
        "ts": 1789537016852
      },
      "exam1-325": {
        "my": "C",
        "ok": true,
        "ts": 1789537024050
      },
      "exam1-327": {
        "my": "C",
        "ok": true,
        "ts": 1789537132736
      },
      "exam1-329": {
        "my": "C",
        "ok": true,
        "ts": 1789537139846
      },
      "exam1-330": {
        "my": "B",
        "ok": true,
        "ts": 1789537145422
      },
      "exam1-331": {
        "my": "A",
        "ok": false,
        "ts": 1789538837404
      },
      "exam1-335": {
        "my": "C",
        "ok": true,
        "ts": 1789538974919
      },
      "exam1-356": {
        "my": "C",
        "ok": true,
        "ts": 1789538986440
      },
      "exam1-358": {
        "my": "B",
        "ok": true,
        "ts": 1789539108195
      },
      "exam1-395": {
        "my": "ADF",
        "ok": true,
        "ts": 1789539219603
      },
      "exam1-396": {
        "my": "CF",
        "ok": false,
        "ts": 1789539473147
      },
      "exam3-425": {
        "my": "B",
        "ok": true,
        "ts": 1789539489092
      },
      "exam3-427": {
        "my": "B",
        "ok": true,
        "ts": 1789539555309
      },
      "exam3-428": {
        "my": "B",
        "ok": true,
        "ts": 1789539558667
      },
      "exam3-429": {
        "my": "C",
        "ok": false,
        "ts": 1789539565968
      },
      "exam3-463": {
        "my": "B",
        "ok": true,
        "ts": 1789539609878
      },
      "exam3-481": {
        "my": "C",
        "ok": false,
        "ts": 1789539625161
      },
      "exam3-483": {
        "my": "C",
        "ok": true,
        "ts": 1789539879500
      },
      "exam3-495": {
        "my": "ABEF",
        "ok": false,
        "ts": 1789540069078
      },
      "exam3-496": {
        "my": "AD",
        "ok": false,
        "ts": 1789540379566
      },
      "exam3-497": {
        "my": "BDF",
        "ok": true,
        "ts": 1789540725518
      },
      "exam3-499": {
        "my": "ABCF",
        "ok": false,
        "ts": 1789541112906
      },
      "exam4-525": {
        "my": "B",
        "ok": true,
        "ts": 1789541264643
      },
      "exam4-526": {
        "my": "C",
        "ok": true,
        "ts": 1789541420066
      },
      "exam4-527": {
        "my": "B",
        "ok": true,
        "ts": 1789541429268
      },
      "exam4-528": {
        "my": "B",
        "ok": true,
        "ts": 1789541437783
      },
      "exam4-529": {
        "my": "C",
        "ok": true,
        "ts": 1789541442346
      },
      "exam4-558": {
        "my": "A",
        "ok": false,
        "ts": 1789541454952
      },
      "exam4-560": {
        "my": "B",
        "ok": true,
        "ts": 1789542616303
      },
      "exam4-595": {
        "my": "ABEF",
        "ok": false,
        "ts": 1789548359899
      },
      "exam4-596": {
        "my": "ABCE",
        "ok": true,
        "ts": 1789548521964
      },
      "exam4-597": {
        "my": "ABCD",
        "ok": false,
        "ts": 1789548748281
      },
      "exam4-609": {
        "my": "ABCDEF",
        "ok": false,
        "ts": 1789548800547
      },
      "exam4-619": {
        "my": "ABEF",
        "ok": false,
        "ts": 1789550222547
      },
      "exam5-625": {
        "my": "C",
        "ok": true,
        "ts": 1789550314955
      },
      "exam5-626": {
        "my": "D",
        "ok": true,
        "ts": 1789550323446
      },
      "exam5-629": {
        "my": "B",
        "ok": true,
        "ts": 1789550329775
      },
      "exam5-630": {
        "my": "C",
        "ok": true,
        "ts": 1789550420431
      },
      "exam5-631": {
        "my": "C",
        "ok": true,
        "ts": 1789550472412
      },
      "exam5-658": {
        "my": "B",
        "ok": true,
        "ts": 1789550480246
      },
      "exam5-674": {
        "my": "A",
        "ok": true,
        "ts": 1789550510750
      },
      "exam5-675": {
        "my": "C",
        "ok": false,
        "ts": 1789550547273
      },
      "exam5-676": {
        "my": "A",
        "ok": true,
        "ts": 1789550736484
      },
      "exam5-696": {
        "my": "ABCD",
        "ok": true,
        "ts": 1789550749872
      },
      "exam5-719": {
        "my": "ACDE",
        "ok": false,
        "ts": 1789550769584
      },
      "moni001-728": {
        "my": "B",
        "ok": true,
        "ts": 1789551136852
      },
      "moni001-730": {
        "my": "B",
        "ok": true,
        "ts": 1789551216249
      },
      "moni001-736": {
        "my": "C",
        "ok": true,
        "ts": 1789551223894
      },
      "moni001-750": {
        "my": "B",
        "ok": true,
        "ts": 1789551235047
      },
      "moni001-758": {
        "my": "B",
        "ok": true,
        "ts": 1789551252283
      },
      "moni001-761": {
        "my": "B",
        "ok": true,
        "ts": 1789551264725
      },
      "moni001-770": {
        "my": "B",
        "ok": true,
        "ts": 1789551288390
      },
      "moni001-778": {
        "my": "ABD",
        "ok": true,
        "ts": 1789551761431
      },
      "moni001-780": {
        "my": "ABCD",
        "ok": true,
        "ts": 1789551787586
      },
      "moni002-801": {
        "my": "B",
        "ok": true,
        "ts": 1789551837034
      },
      "moni002-808": {
        "my": "ABC",
        "ok": false,
        "ts": 1789552107042
      },
      "moni002-809": {
        "my": "ABCD",
        "ok": true,
        "ts": 1789552291024
      },
      "moni002-814": {
        "my": "ABC",
        "ok": true,
        "ts": 1789552341162
      },
      "moni002-824": {
        "my": "BC",
        "ok": false,
        "ts": 1789552366161
      },
      "moni003-850": {
        "my": "B",
        "ok": true,
        "ts": 1789552422023
      },
      "moni003-855": {
        "my": "A",
        "ok": false,
        "ts": 1789552471462
      },
      "moni004-913": {
        "my": "B",
        "ok": true,
        "ts": 1789552762651
      },
      "moni004-924": {
        "my": "A",
        "ok": true,
        "ts": 1789552791582
      },
      "moni004-930": {
        "my": "B",
        "ok": true,
        "ts": 1789552806560
      },
      "moni004-932": {
        "my": "A",
        "ok": true,
        "ts": 1789552840174
      },
      "moni005-990": {
        "my": "D",
        "ok": false,
        "ts": 1789552855373
      },
      "moni005-991": {
        "my": "B",
        "ok": true,
        "ts": 1789552877233
      },
      "moni005-1047": {
        "my": "ABCD",
        "ok": false,
        "ts": 1789552934175
      },
      "moni006-1050": {
        "my": "B",
        "ok": true,
        "ts": 1789553034088
      },
      "moni006-1059": {
        "my": "B",
        "ok": true,
        "ts": 1789553098480
      },
      "moni006-1064": {
        "my": "ACD",
        "ok": true,
        "ts": 1789553149642
      },
      "bank553-1071": {
        "my": "B",
        "ok": true,
        "ts": 1789553160765
      },
      "bank553-1077": {
        "my": "D",
        "ok": true,
        "ts": 1789553166777
      },
      "bank553-1078": {
        "my": "D",
        "ok": true,
        "ts": 1789553181533
      },
      "bank553-1081": {
        "my": "B",
        "ok": true,
        "ts": 1789553196626
      },
      "bank553-1082": {
        "my": "A",
        "ok": true,
        "ts": 1789553342380
      },
      "bank553-1084": {
        "my": "A",
        "ok": true,
        "ts": 1789553346121
      },
      "bank553-1098": {
        "my": "A",
        "ok": true,
        "ts": 1789553384290
      },
      "bank553-1107": {
        "my": "B",
        "ok": true,
        "ts": 1789553387736
      },
      "bank553-1112": {
        "my": "BD",
        "ok": true,
        "ts": 1789553400326
      },
      "bank553-1129": {
        "my": "A",
        "ok": true,
        "ts": 1789553406411
      },
      "bank553-1132": {
        "my": "A",
        "ok": true,
        "ts": 1789553409582
      },
      "bank553-1134": {
        "my": "B",
        "ok": true,
        "ts": 1789553420806
      },
      "bank553-1145": {
        "my": "B",
        "ok": true,
        "ts": 1789553425273
      },
      "bank553-1148": {
        "my": "A",
        "ok": true,
        "ts": 1789553451911
      },
      "bank553-1167": {
        "my": "D",
        "ok": true,
        "ts": 1789553486352
      },
      "bank553-1192": {
        "my": "B",
        "ok": true,
        "ts": 1789553510945
      },
      "bank553-1208": {
        "my": "A",
        "ok": true,
        "ts": 1789553518898
      },
      "bank553-1216": {
        "my": "B",
        "ok": true,
        "ts": 1789553527560
      },
      "bank553-1224": {
        "my": "A",
        "ok": true,
        "ts": 1789553537235
      },
      "bank553-1247": {
        "my": "A",
        "ok": true,
        "ts": 1789553548140
      },
      "bank553-1252": {
        "my": "A",
        "ok": true,
        "ts": 1789553554636
      },
      "bank553-1253": {
        "my": "A",
        "ok": true,
        "ts": 1789553557336
      },
      "bank553-1282": {
        "my": "B",
        "ok": true,
        "ts": 1789553567617
      },
      "bank553-1283": {
        "my": "A",
        "ok": true,
        "ts": 1789553577245
      },
      "bank553-1284": {
        "my": "A",
        "ok": true,
        "ts": 1789553580161
      },
      "bank553-1296": {
        "my": "A",
        "ok": true,
        "ts": 1789553583875
      },
      "bank553-1328": {
        "my": "A",
        "ok": true,
        "ts": 1789553612205
      },
      "bank553-1331": {
        "my": "B",
        "ok": true,
        "ts": 1789553617345
      },
      "bank553-1340": {
        "my": "A",
        "ok": true,
        "ts": 1789553627583
      },
      "bank553-1341": {
        "my": "B",
        "ok": true,
        "ts": 1789553640982
      },
      "bank553-1352": {
        "my": "A",
        "ok": true,
        "ts": 1789553653301
      },
      "bank553-1373": {
        "my": "C",
        "ok": true,
        "ts": 1789553686689
      },
      "bank553-1377": {
        "my": "B",
        "ok": true,
        "ts": 1789553710812
      },
      "bank553-1417": {
        "my": "B",
        "ok": true,
        "ts": 1789553732834
      },
      "bank553-1419": {
        "my": "C",
        "ok": true,
        "ts": 1789553747802
      },
      "bank553-1433": {
        "my": "C",
        "ok": true,
        "ts": 1789553767127
      },
      "bank553-1444": {
        "my": "D",
        "ok": true,
        "ts": 1789553782691
      },
      "bank553-1448": {
        "my": "D",
        "ok": true,
        "ts": 1789553813990
      },
      "bank553-1462": {
        "my": "A",
        "ok": true,
        "ts": 1789553841885
      },
      "bank553-1468": {
        "my": "C",
        "ok": true,
        "ts": 1789655390370
      },
      "bank553-1480": {
        "my": "A",
        "ok": false,
        "ts": 1789655426364
      },
      "bank553-1488": {
        "my": "A",
        "ok": true,
        "ts": 1789655460130
      },
      "bank553-1499": {
        "my": "B",
        "ok": true,
        "ts": 1789655479686
      },
      "bank553-1500": {
        "my": "B",
        "ok": true,
        "ts": 1789655496959
      },
      "bank553-1503": {
        "my": "B",
        "ok": true,
        "ts": 1789656376187
      },
      "bank553-1515": {
        "my": "B",
        "ok": true,
        "ts": 1789656385800
      },
      "bank553-1524": {
        "my": "AB",
        "ok": true,
        "ts": 1789656641332
      },
      "bank553-1525": {
        "my": "AB",
        "ok": true,
        "ts": 1789656650458
      },
      "bank553-1527": {
        "my": "BC",
        "ok": true,
        "ts": 1789656667509
      },
      "bank553-1544": {
        "my": "AD",
        "ok": true,
        "ts": 1789656699066
      },
      "bank553-1549": {
        "my": "AB",
        "ok": true,
        "ts": 1789656707096
      },
      "bank553-1556": {
        "my": "AB",
        "ok": true,
        "ts": 1789656717758
      },
      "bank553-1577": {
        "my": "ACD",
        "ok": false,
        "ts": 1789656744874
      },
      "bank553-1579": {
        "my": "BD",
        "ok": false,
        "ts": 1789658097619
      },
      "bank553-1588": {
        "my": "AC",
        "ok": false,
        "ts": 1789658209288
      },
      "bank553-1602": {
        "my": "AB",
        "ok": true,
        "ts": 1789658351611
      },
      "bank553-1604": {
        "my": "AB",
        "ok": true,
        "ts": 1789658365817
      },
      "bank553-1610": {
        "my": "ABCD",
        "ok": true,
        "ts": 1789658389676
      },
      "bank553-1613": {
        "my": "AB",
        "ok": true,
        "ts": 1789658439696
      },
      "bank553-1614": {
        "my": "ABC",
        "ok": true,
        "ts": 1789658450707
      },
      "bank553-1617": {
        "my": "AB",
        "ok": true,
        "ts": 1789658465703
      },
      "bank553-1624": {
        "my": "AB",
        "ok": true,
        "ts": 1789658470093
      },
      "bank553-1635": {
        "my": "AC",
        "ok": true,
        "ts": 1789658497424
      },
      "bank553-1646": {
        "my": "ABD",
        "ok": true,
        "ts": 1789658648730
      },
      "bank553-1650": {
        "my": "ABC",
        "ok": false,
        "ts": 1789658843501
      },
      "bank553-1653": {
        "my": "ABC",
        "ok": true,
        "ts": 1789659025746
      },
      "bank553-1655": {
        "my": "ABCD",
        "ok": false,
        "ts": 1789659041326
      },
      "bank553-1661": {
        "my": "AB",
        "ok": false,
        "ts": 1789659074333
      },
      "bank553-1678": {
        "my": "BCD",
        "ok": true,
        "ts": 1789659265824
      },
      "bank553-1707": {
        "my": "BD",
        "ok": true,
        "ts": 1789659423039
      },
      "bank326-1713": {
        "my": "AEF",
        "ok": true,
        "ts": 1789718340173
      },
      "bank326-1744": {
        "my": "D",
        "ok": true,
        "ts": 1789718891767
      },
      "bank326-1769": {
        "my": "B",
        "ok": true,
        "ts": 1789718968365
      },
      "bank326-1771": {
        "my": "C",
        "ok": true,
        "ts": 1789719024829
      },
      "bank326-1773": {
        "my": "B",
        "ok": true,
        "ts": 1789719036380
      },
      "bank326-1774": {
        "my": "C",
        "ok": false,
        "ts": 1789720299879
      },
      "bank326-1788": {
        "my": "C",
        "ok": false,
        "ts": 1789720394271
      },
      "bank326-1789": {
        "my": "A",
        "ok": true,
        "ts": 1789721261667
      },
      "bank326-1797": {
        "my": "D",
        "ok": false,
        "ts": 1789722206900
      },
      "bank326-1798": {
        "my": "D",
        "ok": true,
        "ts": 1789722302892
      },
      "bank326-1820": {
        "my": "ACD",
        "ok": true,
        "ts": 1789722466313
      },
      "bank326-1821": {
        "my": "BCD",
        "ok": true,
        "ts": 1789722570991
      },
      "bank326-1830": {
        "my": "AD",
        "ok": true,
        "ts": 1789722660572
      },
      "bank326-1835": {
        "my": "C",
        "ok": true,
        "ts": 1789722665404
      },
      "bank326-1841": {
        "my": "D",
        "ok": true,
        "ts": 1789723788541
      },
      "bank326-1842": {
        "my": "D",
        "ok": true,
        "ts": 1789725011655
      },
      "bank326-1849": {
        "my": "B",
        "ok": true,
        "ts": 1789740621705
      },
      "bank326-1854": {
        "my": "D",
        "ok": true,
        "ts": 1789740632195
      },
      "bank326-1863": {
        "my": "C",
        "ok": true,
        "ts": 1789740784756
      },
      "bank326-1867": {
        "my": "C",
        "ok": true,
        "ts": 1789740800756
      },
      "bank326-1875": {
        "my": "B",
        "ok": true,
        "ts": 1789740820822
      },
      "bank326-1892": {
        "my": "A",
        "ok": false,
        "ts": 1789740838332
      },
      "bank326-1904": {
        "my": "ABD",
        "ok": false,
        "ts": 1793265860234
      },
      "bank326-1908": {
        "my": "BC",
        "ok": false,
        "ts": 1793272860270
      },
      "bank326-1919": {
        "my": "B",
        "ok": false,
        "ts": 1793272903254
      },
      "bank326-1937": {
        "my": "C",
        "ok": true,
        "ts": 1793276506418
      },
      "bank326-1939": {
        "my": "A",
        "ok": true,
        "ts": 1793277009565
      },
      "bank326-1947": {
        "my": "D",
        "ok": true,
        "ts": 1793277076935
      },
      "bank326-1953": {
        "my": "D",
        "ok": true,
        "ts": 1793277090894
      },
      "bank326-1962": {
        "my": "C",
        "ok": true,
        "ts": 1793277108969
      },
      "bank326-1967": {
        "my": "B",
        "ok": true,
        "ts": 1793277175986
      },
      "bank326-1968": {
        "my": "B",
        "ok": true,
        "ts": 1793277201294
      },
      "bank326-1969": {
        "my": "A",
        "ok": false,
        "ts": 1793277355425
      },
      "bank326-1973": {
        "my": "C",
        "ok": true,
        "ts": 1793277384618
      },
      "bank553-1564": {
        "my": "AB",
        "ok": false,
        "ts": 1793277722563
      },
      "bank326-1715": {
        "my": "AB",
        "ok": false,
        "ts": 1793279366020
      },
      "bank326-1980": {
        "my": "AD",
        "ok": true,
        "ts": 1793281228154
      },
      "bank326-1982": {
        "my": "D",
        "ok": true,
        "ts": 1793281280282
      },
      "bank326-1986": {
        "my": "B",
        "ok": true,
        "ts": 1793281363586
      }
    },
    "stars": [
      "ex0-13",
      "exam5-630",
      "exam5-674",
      "exam5-676",
      "moni002-801",
      "bank553-1148",
      "bank553-1480",
      "bank553-1577",
      "bank553-1588",
      "bank553-1650",
      "bank553-1655",
      "bank553-1678",
      "bank326-1713",
      "bank326-1788",
      "bank326-1841",
      "bank326-1854",
      "bank326-1863",
      "bank326-1904",
      "bank326-1969",
      "bank326-1715"
    ],
    "wrongs": [
      "ex0-0",
      "ex0-3",
      "ex0-13",
      "ex0-16",
      "ex0-26",
      "exam1-331",
      "exam1-396",
      "exam3-429",
      "exam3-481",
      "exam3-495",
      "exam3-496",
      "exam3-499",
      "exam4-558",
      "exam4-595",
      "exam4-597",
      "exam4-609",
      "exam4-619",
      "exam5-675",
      "exam5-719",
      "moni002-808",
      "moni002-824",
      "moni003-855",
      "moni005-990",
      "moni005-1047",
      "bank553-1480",
      "bank553-1577",
      "bank553-1579",
      "bank553-1588",
      "bank553-1650",
      "bank553-1655",
      "bank553-1661",
      "bank326-1774",
      "bank326-1788",
      "bank326-1797",
      "bank326-1892",
      "bank326-1904",
      "bank326-1908",
      "bank326-1919",
      "bank326-1969",
      "bank553-1564",
      "bank326-1715"
    ]
  },
  "knownLegacy": []
};

# API de Conversão de Texto para Áudio em Japonês

Esta é uma API desenvolvida para converter texto em japonês em arquivos de áudio. Ela aceita solicitações do tipo POST na rota `/textConverter` e retorna um arquivo de áudio no formato .mp3.

## Funcionamento

1. **URL Base**: `https://japanesespeaker.onrender.com`

2. **Rota**: `/textConverter`

3. **Método**: POST

4. **Corpo da Requisição**:

   A requisição deve incluir um arquivo JSON com a seguinte estrutura:
   ```json
   {
       "text": "Texto que será convertido em áudio em japonês."
   }
   ```

5. **Resposta**:

   A resposta será um arquivo de áudio no formato .mp3, contendo a pronúncia do texto em japonês.

6. **Exemplo de Uso**:

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"text":"こんにちは、世界"}' https://japanesespeaker.onrender.com/textConverter --output pronuncia_japones.mp3
   ```

   Este exemplo utiliza o cURL para enviar uma solicitação POST com o texto em japonês "こんにちは、世界" e salva a resposta como `pronuncia_japones.mp3`.

## Notas Adicionais

- Certifique-se de que o texto enviado esteja em japonês para obter uma pronúncia correta, o texto pode ser escrito utilizando: hiragana, katakana, kanji e romaji.

---

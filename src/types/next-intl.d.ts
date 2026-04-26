// next-intl 型安全設定
// ja.json をマスターとして、全キーの型チェックを有効化する
// これにより存在しないキーを t() に渡すと TypeScript エラーになる

import messages from "../../messages/ja.json";

type Messages = typeof messages;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface IntlMessages extends Messages {}
}

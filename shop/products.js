/* Куда ведёт кнопка «Заказать», пока для товара не задана ссылка на оплату (payUrl) */
window.DG_ORDER_URL = "https://vk.ru/artemvladimmak";

/* Ссылка на оплату через Робокассу (URL оплаты). Подставляется в кнопку «Заказать» на странице товара.
   Формат: https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=...&OutSum=...&InvId=0&Description=...
   Для товаров с вариантами можно задать payUrl у каждого варианта — он будет использован при выборе варианта. */
window.DG_ROBOKASSA_PAY_URL = "";

/* Все товары сайта в одном месте. Правьте цены и тексты здесь: изменения попадут и в каталог, и в слайдер на главной.
   variants — несколько объёмов с разной ценой; price/oldPrice — одна цена (для наборов). Цены в рублях.
   payUrl — ссылка на оплату этого товара (или этого объёма) через Робокассу; пока пусто, используется DG_ROBOKASSA_PAY_URL.
   Как только ссылка задана, кнопка «Заказать» откроет оплату. */
window.DG_PRODUCTS = [
  {
    slug: "muhomor",
    title: "Мухомор Красный",
    text: "100% молотых шляпок красного мухомора. Капсулы по 400 мг",
    image: "/assets/photos/card-muhomor.webp?v=20261127",
    variants: [{ label: "100 капсул", price: 1300, payUrl: "" }, { label: "150 капсул", price: 2000, payUrl: "" }]
  },
  {
    slug: "ezhovik",
    title: "Ежовик Гребенчатый",
    text: "Зерномицелий гриба ежовика гребенчатого 100%. Капсулы по 600 мг",
    image: "/assets/photos/card-ezhovik.webp?v=20261127",
    variants: [{ label: "100 капсул", price: 1200, payUrl: "" }, { label: "150 капсул", price: 1900, payUrl: "" }]
  },
  {
    slug: "muhomor-ezhovik",
    title: "Ежовик + Мухомор",
    text: "Ежовик гребенчатый 70% и красный мухомор 30%. Капсулы по 700 мг",
    image: "/assets/photos/card-muhomor-ezhovik.webp?v=20261127",
    variants: [{ label: "100 капсул", price: 1300, payUrl: "" }, { label: "150 капсул", price: 2000, payUrl: "" }]
  },
  {
    slug: "kordizeps",
    title: "Кордицепс военный",
    text: "Зерномицелий гриба кордицепса военного 100%. Капсулы по 600 мг",
    image: "/assets/photos/card-kordizeps.webp?v=20261127",
    variants: [{ label: "100 капсул", price: 1200, payUrl: "" }, { label: "150 капсул", price: 1900, payUrl: "" }]
  },
  {
    slug: "zhenskyi",
    title: "Набор «Женский щит»",
    text: "Набор: ежовик 150 капсул и красный мухомор 150 капсул",
    image: "/assets/photos/card-zhenskyi.webp?v=20261127",
    price: 3750,
    oldPrice: 5000,
    payUrl: ""
  },
  {
    slug: "myzhskoy-rezhim",
    title: "Набор «Мужской режим»",
    text: "Набор: кордицепс 100 капсул и ежовик 100 капсул",
    image: "/assets/photos/card-myzhskoy-rezhim.webp?v=20261127",
    price: 2000,
    oldPrice: 2600,
    payUrl: ""
  },
  {
    slug: "liderskyi-nabor",
    title: "Лидерский набор",
    text: "Набор: ежовик, красный мухомор и кордицепс, банки по 100 капсул",
    image: "/assets/photos/card-liderskyi-nabor.webp?v=20261127",
    price: 3000,
    oldPrice: 4200,
    payUrl: ""
  }
];

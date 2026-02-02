import { test, expect } from "@playwright/test";

const cases = [
  {
    name: "iPhone 6s 16GB",
    url: "/iphone-6s-16gb",
    addClicks: 2,
  },
  {
    name: "Dell XPS 15 9550",
    url: "/dell-xps-15-9550",
    addClicks: 1,
  },
  {
    name: "Samsung Galaxy A5",
    url: "/samsung-galaxy-a5",
    addClicks: 3,
  },
  {
    name: "iPad Pro Wi-Fi 4G 128GB",
    url: "/ipad-pro-wi-fi-4g-128gb",
    addClicks: 4,
  },
];

for (const c of cases) {
  test(`[Product] Updating product quantity - ${c.name}`, async ({ page }) => {
    await page.goto(c.url);

    await expect(page.locator("h1").getByText(c.name, { exact: true })).toBeVisible();

    const quantityInput = page.locator("input.quantity-field:visible");
    const initial = Number(await quantityInput.inputValue());

    const plusBtn = page.getByRole("button", { name: "+" });

    for (let i = 0; i < c.addClicks; i++) {
      await plusBtn.click();
    }

    const updated = Number(await quantityInput.inputValue());
    expect(updated).toBeGreaterThan(initial);

    const addCartBtn = page.getByRole("button", { name: "Add to cart" });

    await addCartBtn.click();

    const modalTitle = page.getByText("The product has been added to your cart");
    await modalTitle.waitFor({ state: "visible", timeout: 10000 });

    await page.getByText("Continue shopping").click();
    await page.locator(".fa.fa-shopping-cart").click();

    await expect(page.getByText(c.name)).toBeVisible();

    const cartQuantityInput = page.locator("input.quantity-field");
    const cartQuantity = Number(await cartQuantityInput.inputValue());

    expect(cartQuantity).toBe(updated);
  });
}

import { test, expect } from "@playwright/test";

test("[Cart] Adding a product to the cart", async ({ page }) => {
  await page.goto("/dell-xps-15-9550");

  const laptopTitle = page.getByRole("heading", { name: /Dell XPS 15 9550/i });
  await expect(laptopTitle).toBeVisible();

  const addCartBtn = page.getByRole("button", { name: "Add to cart" });
  await expect(addCartBtn).toBeVisible();
  await expect(addCartBtn).toBeEnabled();
  await addCartBtn.scrollIntoViewIfNeeded();

  await addCartBtn.click();

  const modalTitle = page.getByText('The product has been added to your cart')
  await modalTitle.waitFor({ state: "visible", timeout: 10000 });

  await page.getByText("Continue shopping").click();
  await page.locator(".fa.fa-shopping-cart").click();
  await expect(page.getByText("Dell XPS 15 9550")).toBeVisible();
});
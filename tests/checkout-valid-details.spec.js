import { test, expect } from "@playwright/test";

test("[TC_CHECK_001] Proceeding to checkout with valid details", async ({ page }) => {
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

  await (page.getByText("Dell XPS 15 9550")).waitFor({ state: "visible", timeout: 5000 });

  const checkoutBtn = page.getByRole('button', { name: 'Process to Checkout' });
  await checkoutBtn.click();

  await page.fill("#Email", process.env.EMAIL_USER ?? "test-email@test.com");
  await page.fill("#Password", process.env.PASS_USER ?? "test123");
  await page.getByRole("button", { name: "Log in" }).click();

  // await expect(page.getByRole("link", { name: /Hello Jane Doe!/i }))
  //   .toBeVisible({ timeout: 15000 });
  await expect(page.locator('a[href="/user"]').first())
    .toBeVisible({ timeout: 20000 });

  await checkoutBtn.click();

  const selectAddress = page.locator("//body/div[@class='container body-content clearfix']/div[@class='row']/div[@class='col-md-8']/form[@id='checkout-delivery-address']/div[1]/label[1]/input[1]");
  await selectAddress.click();

  // const paymentBtn = page.getByRole('button', { name: 'Payment' });
  // await paymentBtn.click();
  const paymentBtn = page.getByRole('button', { name: 'Payment' });
  await expect(paymentBtn).toBeEnabled({ timeout: 30000 });
  await paymentBtn.click();

  const cashOnDeliveryBtn = page.getByRole('button', { name: 'Cash on Delivery' });
  await cashOnDeliveryBtn.click();

  const congratulationTitle = page.getByText('Congratulation!');
  await expect(congratulationTitle).toBeVisible();
});
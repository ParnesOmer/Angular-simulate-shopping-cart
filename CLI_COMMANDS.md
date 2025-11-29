# Angular CLI Commands Used

## Step 1: Project Creation

```bash
ng new bmc-shop --routing --style=css --skip-git
```

## Step 2: Module Creation

```bash
ng generate module auth --routing
ng generate module shop --routing
```

## Step 3: Component Creation

```bash
ng generate component auth/pages/login
ng generate component auth/pages/register
ng generate component shop/components/header
ng generate component shop/pages/products
ng generate component shop/pages/cart
```

## Step 4: Service Creation

```bash
ng generate service core/services/auth
ng generate service core/services/cart
ng generate service core/services/local-storage
```

## Step 5: Guard Creation

```bash
ng generate guard core/guards/auth
```

## Step 6: Model Files

Model files were created manually in `src/app/core/models/`:
- `user.model.ts`
- `product.model.ts`
- `cart-item.model.ts`


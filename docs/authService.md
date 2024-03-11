# Auth Service

Some tips:

1. group routes in the `routes` folder
1. use `express-validator` for validating fields

Deep dive:

1. middleware. When using `express-validator`, we are using middleware and pass the validation result along the chain.

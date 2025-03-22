// hierarchical_model.stan
// Hierarchical Gaussian regression with user-specific treatment and covariate effects
// Data model: for observation i belonging to user m:
//    Y[i] ~ normal( dot_product(D[i], theta[m]) + dot_product(X[i], beta[m]), sigma )
// where:
//    - D[i] is a 1xJ vector (one-hot treatment indicator)
//    - X[i] is a 1xK covariate vector
//    - theta[m] is a J-dimensional vector (user m's treatment effects)
//    - beta[m] is a K-dimensional vector (user m's covariate effects)
//
// Hierarchical priors are imposed on theta and beta:
//    theta[m] ~ normal(mu_theta, sigma_theta)
//    beta[m]  ~ normal(mu_beta, sigma_beta)
// and hyperpriors are specified on (mu_theta, sigma_theta) and (mu_beta, sigma_beta).

data {
  int<lower=1> M;             // number of users (groups)
  int<lower=1> N;             // total number of observations (sum_m N_m)
  int<lower=1> K;             // number of covariates
  int<lower=1> J;             // number of treatments
  array[N] int<lower=1, upper=M> user; // user indicator for each observation (1-indexed)
  vector[N] Y;                // outcome vector
  matrix[N, K] X;             // covariate matrix
  matrix[N, J] D;             // treatment indicator matrix (one-hot encoded)
  real<lower=0> sigma;        // known noise standard deviation in outcome equation
}

parameters {
  // User-level parameters:
  matrix[M, J] theta;         // treatment effects for each user, each row is a vector (length J)
  matrix[M, K] beta;          // covariate effects for each user, each row is a vector (length K)
  
  // Hyperparameters for theta (population-level)
  vector[J] mu_theta;         // population mean for treatment effects
  vector<lower=0>[J] sigma_theta;  // population std dev for treatment effects (each treatment separately)
  
  // Hyperparameters for beta (population-level)
  vector[K] mu_beta;          // population mean for covariate effects
  vector<lower=0>[K] sigma_beta;   // population std dev for covariate effects (each covariate separately)
}

model {
  // Hyperpriors: weakly informative
  mu_theta ~ normal(0, 4);
  sigma_theta ~ cauchy(0, 4);
  
  mu_beta ~ normal(0, 4);
  sigma_beta ~ cauchy(0, 4);
  
  // Hierarchical priors for user-level parameters:
  for (m in 1:M) {
    theta[m] ~ normal(mu_theta, sigma_theta);
    beta[m] ~ normal(mu_beta, sigma_beta);
  }
  
  // Likelihood:
  for (n in 1:N) {
    int m = user[n]; // group index for observation n
    // Linear predictor: sum of treatment effect and covariate effect
    real mu_n;
    mu_n = dot_product(D[n], theta[m]) + dot_product(X[n], beta[m]);
    Y[n] ~ normal(mu_n, sigma);
  }
}

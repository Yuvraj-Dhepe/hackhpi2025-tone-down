## SAMPLES from closed form posterior in standard normal linear regression model with treatment effect indicators
## exploits full conjugacy of a Gaussian prior and Gaussian likelihood model.

import numpy as np
import json

# MAIN FUNCTION
def draw_posterior_theta(Y, X, D, n_draws=1000):
    """
    Draw samples from the marginal posterior of theta.
    
    Parameters:
      Y : (N,) numpy array of outcomes.
      X : (N, K) numpy array of covariates.
      D : (N, J) numpy array of treatment indicators (one-hot encoded for J treatments).
      n_draws : int, number of posterior draws to generate.
    
    Returns:
      samples : (n_draws, J) numpy array where each row is a draw from the posterior of theta.
    """

    # Dimensions
    N = Y.shape[0]
    K = X.shape[1]
    J = D.shape[1]
    
    # Define prior parameters
    mu_theta = np.zeros(J)
    Sigma_theta = np.eye(J) * 3  # relatively vague prior
    mu_beta = np.zeros(K)
    Sigma_beta = np.eye(K) * 3   # relatively vague prior
    sigma2 = 1.0  # known outcome equation noise variance

    # Ensure Y is a column vector
    Y = Y.reshape(-1, 1)  # (N, 1)
    
    # Construct the full design matrix Z = [D, X]
    Z = np.hstack([D, X])  # shape: (N, J+K)
    
    # Compute the inverse of the prior covariance matrices
    inv_Sigma_theta = np.linalg.inv(Sigma_theta)  # (J, J)
    inv_Sigma_beta  = np.linalg.inv(Sigma_beta)     # (K, K)
    
    # Build block-diagonal prior precision for [theta; beta]
    prior_precision = np.block([
        [inv_Sigma_theta, np.zeros((J, K))],
        [np.zeros((K, J)), inv_Sigma_beta]
    ])  # shape: (J+K, J+K)
    
    # Data precision from the likelihood
    data_precision = (Z.T @ Z) / sigma2  # (J+K, J+K)
    
    # Posterior precision and covariance
    post_precision = data_precision + prior_precision  # (J+K, J+K)
    post_cov = np.linalg.inv(post_precision)
    
    # Compute posterior mean
    # First, form the combined prior mean vector [mu_theta; mu_beta]
    prior_mean = np.concatenate([mu_theta, mu_beta]).reshape(-1, 1)  # (J+K, 1)
    term = (Z.T @ Y) / sigma2 + prior_precision @ prior_mean  # (J+K, 1)
    post_mean = post_cov @ term  # (J+K, 1)
    
    # Extract the marginal posterior for theta (first J entries)
    mu_theta_post = post_mean[:J].flatten()      # (J,)
    Sigma_theta_post = post_cov[:J, :J]            # (J, J)
    
    # Draw samples from N(mu_theta_post, Sigma_theta_post)
    samples = np.random.multivariate_normal(mu_theta_post, Sigma_theta_post, size=n_draws)

    # obtain the posterior likelihood of being the best treatment
    best_arm = np.argmax(samples, axis=1)
    counts = np.bincount(best_arm)
    posterior_best = counts / n_draws

    return samples, posterior_best



# # Example usage (with made-up parameters):
# if __name__ == '__main__':
#     # Simulated dimensions
#     N = 100        # number of observations
#     K = 2          # number of covariates
#     J = 3          # number of treatments
    
#     # Fake data
#     np.random.seed(42)
#     Y = np.random.randn(N)
#     X = np.random.randn(N, K)
#     # For D, assume one-hot encoding of a treatment assigned at random
#     treatments = np.random.choice(J, size=N)
#     D = np.eye(J)[treatments]  # (N, J)
    
#     # Prior parameters for theta and beta
#     mu_theta = np.zeros(J)
#     Sigma_theta = np.eye(J) * 10  # relatively vague prior
#     mu_beta = np.zeros(K)
#     Sigma_beta = np.eye(K) * 10   # relatively vague prior
    
#     sigma2 = 1.0  # known noise variance
    
#     # Draw 1000 samples from the marginal posterior of theta
#     theta_samples = draw_posterior_theta(Y, X, D, mu_theta, Sigma_theta, mu_beta, Sigma_beta, sigma2, n_draws=1000)
#     print("Posterior draws for theta (first 5 samples):")
#     print(theta_samples[:5])

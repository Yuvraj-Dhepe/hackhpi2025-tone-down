import numpy as np
from cmdstanpy import CmdStanModel
from pathlib import Path

# AUXILIARY FUNCTION
def prepare_hierarchical_data(user_data, sigma=1.0):
    """
    Combine data from multiple users (groups) into a dictionary for Stan.
    
    Parameters:
      user_data (list): A list where each element is a tuple (Y, X, D) for one user.
                        Y: (N_i,) outcome vector for user i.
                        X: (N_i, K) covariates matrix for user i.
                        D: (N_i, J) treatment matrix (one-hot) for user i.
      sigma (float): Known noise standard deviation.
    
    Returns:
      dict: A dictionary with keys required by the Stan model.
            The keys include:
              - M: Number of users (groups)
              - N: Total number of observations
              - K: Number of covariates
              - J: Number of treatments
              - user: Integer vector (length N) mapping each observation to a user (1-indexed)
              - Y: Outcome vector (length N)
              - X: Covariate matrix (N x K)
              - D: Treatment indicator matrix (N x J)
              - sigma: Known noise standard deviation.
    """
    M = len(user_data)
    Y_list, X_list, D_list = [], [], []
    user_indicator = []  # will hold group indices for each observation (1-indexed)
    
    for m, (Y, X, D) in enumerate(user_data, start=1):
        n = len(Y)
        Y_list.append(Y)
        X_list.append(X)
        D_list.append(D)
        user_indicator.extend([m] * n)
    
    Y_all = np.concatenate(Y_list)
    X_all = np.vstack(X_list)
    D_all = np.vstack(D_list)
    
    data = {
        'M': M,
        'N': len(Y_all),
        'K': X_all.shape[1],
        'J': D_all.shape[1],
        'user': user_indicator,   # Stan requires 1-indexed integers
        'Y': Y_all,
        'X': X_all,
        'D': D_all,
        'sigma': sigma
    }
    return data

# AUXILIARY FUNCTION
def load_model(stan_file='hier_reg.stan'):
    """
    Compile the Stan model.
    
    Parameters:
      stan_file (str): Name of the Stan model file.
    
    Returns:
      CmdStanModel: A compiled Stan model.
    """
    # Get the directory where this script is
    current_dir = Path(__file__).parent
    stan_path = current_dir / stan_file
    
    if not stan_path.exists():
        raise FileNotFoundError(f"Stan model file not found at: {stan_path}")
        
    model = CmdStanModel(stan_file=str(stan_path))
    return model

# MAIN ENTRY POINT
def run_hierarchical_model(user_data, stan_file='hier_reg.stan',
                           sigma=1.0, iter_sampling=1000, iter_warmup=500, chains=4):
    """
    Prepare data from multiple users, compile, and run the Stan model.
    
    Parameters:
      user_data (list): List of tuples (Y, X, D) for each user.
      stan_file (str): Name of the Stan model file.
      sigma (float): Known noise standard deviation.
      iter_sampling (int): Number of sampling iterations.
      iter_warmup (int): Number of warmup iterations.
      chains (int): Number of MCMC chains.
    
    Returns:
      tuple: (theta_draws, proportions) containing the posterior samples and best arm proportions
    """
    try:
        data = prepare_hierarchical_data(user_data, sigma=sigma)
        model = load_model(stan_file)
        fit = model.sample(data=data, iter_sampling=iter_sampling, iter_warmup=iter_warmup, chains=chains)

        theta_draws = fit.stan_variable("theta") # (n_draws*n_chains, M, J)

        M = theta_draws.shape[1]
        J = theta_draws.shape[2]
        proportions = np.empty((M, J))
        for m in range(M):
            # For user m, find which treatment has the maximum effect for each draw
            best_arm = np.argmax(theta_draws[:, m, :], axis=1)
            counts = np.bincount(best_arm, minlength=J)
            proportions[m, :] = counts / (iter_sampling*chains)

        return theta_draws, proportions
      
    except Exception as e:
        print(f"Error in hierarchical sampling: {str(e)}")
        # Fallback to uniform distribution if sampling fails
        M = len(user_data)
        J = user_data[0][2].shape[1]  # Get number of treatments from first user's data
        theta_draws = np.random.normal(0, 1, (iter_sampling*chains, M, J))
        proportions = np.ones((M, J)) / J  # Uniform distribution
        return theta_draws, proportions

# # Example usage:
# if __name__ == '__main__':
#     # Suppose we have data for M=5 users
#     M = 5
#     N = 100   # observations per user (can vary across users)
#     K = 2     # number of covariates
#     J = 3     # number of treatments
    
#     # Create a list of user data using create_test_data. In practice, each user could have different N.
#     user_data = []
#     for _ in range(M):
#         Y, X, D = create_test_data(N, K, J)
#         user_data.append((Y, X, D))
    
#     # Run the hierarchical model and obtain draws for each theta
#     draws = run_hierarchical_model(user_data, stan_file='hierarchical_model.stan', sigma=1.0)
    

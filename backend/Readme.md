The file `single_user_sampler.py` contains the standalone python function to implement single-user-based sample.
It takes in all past data for a single user and returns draws of the posterior of each treatment effect.

The file `hierarchical_sampler.py` contains a python wrapper to implement hierarchical sampling using cmdstanpy. This runs the hier_reg sampler compiled from `hier_reg.stan` via CMDSTAN. All installation requirements for sampling via cmdstanpy are described here: https://mc-stan.org/cmdstanpy/installation.html. Compilation is done from the `hier_reg.stan` file.

I am also committing the pre-compiled `hier_reg` executable, as well as header files created during compilation, `hier_reg.hpp`.

The backend entry point is the function `backend_call(user_id, database_pull)` in `backend_wrapper.py`. It takes in a userid string and a pandas dataframe formatted as such:

The backend entry point is the function `backend_call(user_id, database_pull)` in `backend_wrapper.py`. It takes in a userid string and a pandas dataframe formatted as such:

| userid | timestamp | y1       | y2       | x1       | x2       | x3       | x4       | x5       | x6       | d1  | d2  | d3  | is_private |
|--------|-----------|----------|----------|----------|----------|----------|----------|----------|----------|-----|-----|-----|------------|
| user2  | 1         | 0.093301 | -1.753119| -2.650670| 0.264841 | 1.220533 | 0.792487 | 1.825662 | -0.251645| 0.0 | 0.0 | 1.0 | 0          |
| user1  | 6         | -1.278666| -0.507055| -0.125395| -0.471740| -1.498506| 0.824714 | -0.421899| 0.421612 | 1.0 | 0.0 | 0.0 | 1          |
| user1  | 1         | 0.446526 | -3.334599| 0.192237 | 0.886780 | 0.013961 | 0.241788 | 0.228739 | -0.317858| 1.0 | 0.0 | 0.0 | 1          |
| user1  | 4         | -0.193645| 0.030432 | -0.155879| -0.645331| 0.472658 | -0.858603| 0.855925 | 0.852089 | 0.0 | 0.0 | 1.0 | 1          |
| user2  | 5         | 1.761101 | -0.415932| -0.383874| -0.920639| 0.236946 | 1.388534 | -0.165252| 0.686771 | 1.0 | 0.0 | 0.0 | 0          |
| user1  | 3         | 0.103112 | 0.785531 | -0.817790| 1.974649 | -0.767403| -0.818775| -1.030303| -1.100224| 0.0 | 0.0 | 1.0 | 0          |
| user2  | 3         | -0.462014| 0.948292 | 0.726439 | 0.050957 | -0.250505| 1.174325 | -0.201625| 0.843921 | 1.0 | 0.0 | 0.0 | 1          |
| user1  | 8         | 0.116968 | -1.140456| -1.459657| 1.510576 | 0.805815 | 0.805535 | -1.289202| -0.543589| 0.0 | 1.0 | 0.0 | 1          |

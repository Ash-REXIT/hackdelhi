from collections import deque

graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}


def bfs(graph, start):
    visited = set()
    queue = deque([start])

    print("BFS Traversal:")

    while queue:
        node = queue.popleft()

        if node not in visited:
            print(node, end=" ")
            visited.add(node)

            for neighbor in graph[node]:
                if neighbor not in visited:
                    queue.append(neighbor)

    print() 


def dfs_recursive(graph, node, visited):
    if node not in visited:
        print(node, end=" ")
        visited.add(node)

        for neighbor in graph[node]:
            dfs_recursive(graph, neighbor, visited)



def dfs_iterative(graph, start):
    visited = set()
    stack = [start]

    print("DFS Traversal (Iterative):")

    while stack:
        node = stack.pop()

        if node not in visited:
            print(node, end=" ")
            visited.add(node)

            # reverse to maintain order
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)

    print()



def main():
    start_node = 'A'

    bfs(graph, start_node)

    print("DFS Traversal (Recursive):")
    dfs_recursive(graph, start_node, set())
    print()

    dfs_iterative(graph, start_node)



if __name__ == "__main__":
    main()

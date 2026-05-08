"""
Mini Proyecto 4: Calculadora de Eigenvalores con SymPy
===========================================
Calcula valores propios, vectores propios y diagonalizacion
"""

import sympy as sp

def linea():
    print("=" * 50)

def header(titulo):
    linea()
    print(f"  {titulo}")
    linea()

def pedir_matriz():
    print("\nIngresa la matriz fila por fila (separados por comas)")
    print("Ejemplo para 2x2: 1,2 / 3,4")
    print("Presiona Enter en una linea vacia para terminar")
    
    filas = []
    while True:
        fila = input("Fila: ").strip()
        if not fila:
            break
        try:
            valores = [sp.sympify(x.strip()) for x in fila.split(',')]
            filas.append(valores)
        except:
            print("Error: formato invalido")
    
    if not filas:
        return None
    
    try:
        return sp.Matrix(filas)
    except:
        print("Error: no se pudo crear la matriz")
        return None

def calcular_eigen():
    M = pedir_matriz()
    if M is None:
        return
    
    print("\nMatriz M:")
    sp.pprint(M)
    print(f"\nForma: {M.rows}x{M.cols}")
    
    # Eigenvalores
    eigenvals = M.eigenvals()
    print("\n[EIGENVALORES]")
    for val, mult in eigenvals.items():
        print(f"  λ = ", end="")
        sp.pprint(val)
        print(f"    (multiplicidad: {mult})")
    
    print("\n[EIGENVECTORES]")
    eigenvects = M.eigenvects()
    for val, mult, vectors in eigenvects:
        print(f"\n  λ = ", end="")
        sp.pprint(val)
        for i, v in enumerate(vectors):
            print(f"    Vector propio {i+1}: ", end="")
            sp.pprint(v)

def forma_diagonal():
    M = pedir_matriz()
    if M is None:
        return
    
    print("\nMatriz M:")
    sp.pprint(M)
    
    try:
        # Diagonalizacion
        P, D = M.diagonalize()
        
        print("\n[DIAGONALIZACION]")
        print("M = P * D * P^-1")
        
        print("\nMatriz P:")
        sp.pprint(P)
        
        print("\nMatriz D (diagonal):")
        sp.pprint(D)
        
        print("\nVerificacion:")
        print("P * D * P^-1 = ")
        verif = P * D * P.inv()
        sp.pprint(verif)
        
    except Exception as e:
        print(f"No se puede diagonalizar: {e}")

def espectro():
    x = sp.symbols('x')
    
    # Polinomio caracteristico
    print("\n[POLINOMIO CARACTERISTICO]")
    print("det(M - λI) = 0")
    
    M = pedir_matriz()
    if M is None:
        return
    
    print("\nMatriz M:")
    sp.pprint(M)
    
    # Crear λ
    lam = sp.symbols('lambda')
    I = sp.eye(M.rows)
    
    char_poly = (M - lam * I).det()
    print(f"\nPolinomio caracteristico:")
    print("det(M - λI) = ", end="")
    sp.pprint(char_poly)
    
    # Raices = eigenvalores
    eigenvalues = sp.solve(char_poly, lam)
    print(f"\nEigenvalores (raices del polinomio):")
    for ev in eigenvalues:
        print("  λ = ", end="")
        sp.pprint(sp.nsimplify(ev))

def demo():
    header("DEMO: Eigenvalores")
    
    print("\n1. Matriz 2x2 simple:")
    M1 = sp.Matrix([[1, 2], [2, 1]])
    print("   M = [[1,2],[2,1]]")
    print("   λ = ", end="")
    sp.pprint(M1.eigenvals())
    
    print("\n2. Matriz identidad:")
    M2 = sp.eye(3)
    print("   I = identidad 3x3")
    print("   λ = ", end="")
    sp.pprint(M2.eigenvals())
    
    print("\n3. Matriz triangular:")
    M3 = sp.Matrix([[1, 1], [0, 2]])
    print("   M = [[1,1],[0,2]]")
    print("   λ = ", end="")
    sp.pprint(M3.eigenvals())
    
    print("\n4. Matriz rotacion 90°:")
    M4 = sp.Matrix([[0, -1], [1, 0]])
    print("   M = [[0,-1],[1,0]] (rotacion 90°)")
    print("   λ = ", end="")
    sp.pprint(M4.eigenvals())

def menu():
    while True:
        header("CALCULADORA DE EIGENVALORES")
        print("  1. Eigenvalores y eigenvectores")
        print("  2. Diagonalizacion")
        print("  3. Polinomio caracteristico")
        print("  4. Ver demos")
        print("  0. Salir")
        
        opcion = input("\nSelecciona: ").strip()
        
        if opcion == "1":
            calcular_eigen()
        elif opcion == "2":
            forma_diagonal()
        elif opcion == "3":
            espectro()
        elif opcion == "4":
            demo()
        elif opcion == "0":
            print("\nHasta luego!")
            break
        else:
            print("Opcion invalida")

if __name__ == "__main__":
    menu()
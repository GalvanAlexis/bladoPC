"""
Mini Proyecto 6: Calculadora de Matrices con SymPy
=========================================
Calcula determinante, traza, inversa, rango, nullspace
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
    print("Ejemplo: 1,2,3 / 4,5,6 / 7,8,9")
    
    filas = []
    while True:
        fila = input("Fila (Enter para terminar): ").strip()
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

def-operaciones_basicas(M):
    x = sp.symbols('x')
    
    print(f"\n[OPERACIONES BASICAS]")
    
    print(f"\n1. Determinante:")
    print(f"   det(M) = ", end="")
    sp.pprint(M.det())
    
    print(f"\n2. Traza:")
    print(f"   tr(M) = ", end="")
    sp.pprint(M.trace())
    
    print(f"\n3. Traspuesta:")
    print(f"   M^T = ", end="")
    sp.pprint(M.T)
    
    print(f"\n4. Inversa:")
    try:
        print(f"   M^-1 = ", end="")
        sp.pprint(M.inv())
    except:
        print("   [No existe - matriz singular]")
    
    print(f"\n5. Rango (rank):")
    print(f"   rank(M) = ", end="")
    sp.pprint(M.rank())
    
    print(f"\n6. Forma reducida (rref):")
    print(f"   rref(M) = ", end="")
    sp.pprint(M.rref()[0])

def nullspace_y_espacios(M):
    print(f"\n[ESPACIOS VECTORIALES]")
    
    print(f"\n1. Espacio nulo (null space):")
    print(f"   {x ∈ R^n : Mx = 0}")
    ns = M.nullspace()
    if ns:
        for i, v in enumerate(ns):
            print(f"   Vector {i+1}: ", end="")
            sp.pprint(v)
    else:
        print("   {0} (solo el vector cero)")
    
    print(f"\n2. Espacio columna (column space):")
    cs = M.columnspace()
    print(f"   Dimension (rank): {len(cs)}")
    for i, v in enumerate(cs):
        print(f"   Base {i+1}: ", end="")
        sp.pprint(v)
    
    print(f"\n3. Espacio fila (row space):")
    rs = M.rowspace()
    print(f"   Dimension (rank): {len(rs)}")
    for i, v in enumerate(rs):
        print(f"   Base {i+1}: ", end="")
        sp.pprint(v)

def operacion_matriz():
    print("\n[OPERACIONES CON MATRICES]")
    print("1. A + B (suma)")
    print("2. A * B (producto)")
    print("3. k * A (escalar)")
    
    opcion = input("Opcion [1-3]: ").strip()
    
    if opcion in ["1", "2", "3"]:
        print("\nMatriz A:")
        A = pedir_matriz()
        if A is None:
            return
        sp.pprint(A)
        
        print("\nMatriz B:")
        B = pedir_matriz()
        if B is None:
            return
        sp.pprint(B)
        
        if opcion == "1":
            try:
                print("\nA + B = ")
                sp.pprint(A + B)
            except:
                print("Error: dimensiones no coinciden")
                
        elif opcion == "2":
            try:
                print("\nA * B = ")
                sp.pprint(A * B)
            except:
                print("Error: no se pueden multiplicar")
                
        elif opcion == "3":
            try:
                k = sp.sympify(input("Escalar k: ").strip())
                print(f"\n{k} * A = ")
                sp.pprint(k * A)
            except:
                print("Error")
    
    elif opcion == "4":
        k = sp.sympify(input("Escalar k: ").strip())
        A = pedir_matriz()
        if A is not None:
            print(f"\n{k} * A = ")
            sp.pprint(k * A)

def resolver_sistema():
    print("\n[RESOLVER SISTEMA Ax = b]")
    
    print("\nMatriz A:")
    A = pedir_matriz()
    if A is None:
        return
    
    print("\nVector b:")
    b_str = input("b (separado por comas): ").strip()
    try:
        b_vals = [sp.sympify(x.strip()) for x in b_str.split(',')]
        b = sp.Matrix(b_vals)
        
        print(f"\nSistema: A * x = b")
        print("A = ")
        sp.pprint(A)
        print("b = ")
        sp.pprint(b)
        
        # Metodo 1: inversa
        try:
            x = A.inv() * b
            print("\n[Metodo 1] x = A^-1 * b")
            print("x = ")
            sp.pprint(x)
        except:
            print("A es singular - no tiene inversa唯一")
        
        # Metodo 2: linsolve
        print("\n[Metodo 2] linsolve:")
        x_sol = sp.linsolve(A, b)
        print("x = ")
        sp.pprint(x_sol)
        
    except Exception as e:
        print(f"Error: {e}")

def demo():
    header("DEMO: Operaciones con Matrices")
    
    M = sp.Matrix([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])
    
    print("\nMatriz M = [[1,2,3],[4,5,6],[7,8,9]]")
    print("Determinante: ", end="")
    sp.pprint(M.det())
    print("Rango: ", end="")
    sp.pprint(M.rank())
    
    print("\nEspacio nulo:")
    ns = M.nullspace()
    for i, v in enumerate(ns):
        print(f"  {i+1}: ", end="")
        sp.pprint(v)

def menu():
    while True:
        header("CALCULADORA DE MATRICES")
        print("  1. Operaciones basicas (det, traza, inv, rank)")
        print("  2. Espacios vectoriales (null, column, row space)")
        print("  3. Operaciones con matrices (suma, producto)")
        print("  4. Resolver sistema Ax = b")
        print("  5. Ver demos")
        print("  0. Salir")
        
        opcion = input("\nSelecciona: ").strip()
        
        if opcion == "1":
            M = pedir_matriz()
            if M:
                sp.pprint(M)
                operaciones_basicas(M)
        elif opcion == "2":
            M = pedir_matriz()
            if M:
                sp.pprint(M)
                nullspace_y_espacios(M)
        elif opcion == "3":
            operacion_matriz()
        elif opcion == "4":
            resolver_sistema()
        elif opcion == "5":
            demo()
        elif opcion == "0":
            print("\nHasta luego!")
            break
        else:
            print("Opcion invalida")

if __name__ == "__main__":
    menu()
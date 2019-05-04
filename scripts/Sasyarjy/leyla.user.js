// ==UserScript==
// @name       leyla
// @namespace  http://bitsler.com
// @version    0.1
// @description  trying
// @match  https://www.bitsler.com/play/dice#
// @match  https://www.bitsler.com/play/dice
// @copyright  2018+, leyla
// ==/UserScript==
//Bitsler Martingale Program

#include <iostream>
#include <iomanip>
#include <cmath>

double const minBet = 0.00000001;
double const minBetLTC = 0.00001;
double betMultiplier = 2.0;

int main() {
    std::string cont = "yes";
    
    while(cont == "yes" || cont == "y") {
        
        
        double initial_balance;
        
        double initial_bet;
        
        std::cout << "Enter intital balance: ";
        std::cin >> initial_balance;
        
        std::cout << "Enter intital bet: ";
        std::cin >> initial_bet;
        
        double iterations = 0;
        
        double currentBalance = initial_balance;
        
        double currentBet = initial_bet;
        
        if(currentBet < currentBalance) {
            currentBalance -= currentBet;
            currentBet = currentBet*betMultiplier;
            iterations++;
        }
        
        while(currentBet < currentBalance) {
            
            currentBalance -= currentBet;
            
            currentBet = currentBet*betMultiplier;
            
            iterations++;
        }
        
        
        std::cout << "Number of losses before bankrupt: " << std::fixed << std::setprecision(0) << iterations << "\n";
        std::cout << "Odds of losing: 1/" << std::fixed << std::setprecision(0) << pow(2.0, iterations) << "\n";
        std::cout<< "Recommended iterations: 15\n";
        
        //find max amount able to bet using 15 iterations
        double currBet = 0;
        int iter = 15;
        double intital_bet_iter = 0;
        double totalBet = 0;
        
        while(totalBet < initial_balance) {
            
            currBet = intital_bet_iter;
            
            totalBet = currBet;
            double nextBet = 0;
            
            for(int i = 0; i < iter - 1; i++) {
                nextBet = currBet*betMultiplier;
                totalBet += nextBet;
                currBet = nextBet;
            }
            
            //won't occur first iteration
            if(totalBet > initial_balance) {
                if(intital_bet_iter < minBetLTC) { std::cout << "Error, minimum bet not met. Cannot execute 15 iterations. Increase balance.\n\n"; break; }
                std::cout << "Max bet = " << std::fixed << std::setprecision(8) << intital_bet_iter - minBet<< "\n\n";
            }
            
            if(totalBet < initial_balance) {
                intital_bet_iter += minBet;
            }
        }
        
        std::cout << "try again? (y/n): ";
        std::cin >> cont;
        
        if(cont == "y" || "yes") {
            std::cout << "\n";
        }
    }
}



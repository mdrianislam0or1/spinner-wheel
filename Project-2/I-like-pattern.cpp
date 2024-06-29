#include<bits/stdc++.h>
using namespace std;

int main()
{

    int N;
    char T,S;
    cin>>N>>T;
    S=T;
    if((N<1 || N>26) || (T!='a' && T!='1'))
    {
        cout<<"WRONG INPUT"<<endl;
    }
    else
    {
        for(int i=1; i<=N; i++)
        {
            S=T;
            if(i==1)
            {
                for(int j=1; j<=N; j++)
                {
                    cout<<S;
                    S+=1;
                }
                cout<<endl;
            }

            else if(i==N)
            {
                S=S+N-1;
                for(int j=1; j<=N; j++)
                {
                    cout<<S;
                    S-=1;
                }

            }
            else
            {
                S=S+i-1;

                for(int j=1; j<=N; j++)
                {
                    if(j==1)
                    {cout<<S;
                    S+=1;}
                    else if(j==N)
                    {
                        S=T+N-1-i+1;
                        cout<<S;
                    }
                    else
                    {
                        cout<<" ";
                    }
                }
                cout<<endl;
            }
        }
    }
    return 0;
}


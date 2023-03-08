class test(object):
    def dailyTemperatures(self, t):
        l=0
        r=1
        res=[]
        while l<len(t):
            while r<len(t)-1:
                if t[r]<=t[l]:
                    r+=1
                    continue
                break
            if(t[r]<=t[l]):
                res.append(0)
            else:
                res.append(r-l)
            l+=1
            r=l+1
        return res